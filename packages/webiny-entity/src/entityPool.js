// @flow

import { Entity, EntityPoolEntry } from ".";

class EntityPool {
    pool: {};
    constructor() {
        this.pool = {};
    }

    getPool() {
        return this.pool;
    }

    add(entity: Entity): this {
        if (!this.getPool()[entity.constructor.name]) {
            this.getPool()[entity.constructor.name] = {};
        }

        this.getPool()[entity.constructor.name][entity.id] = new EntityPoolEntry(entity);
        return this;
    }

    has(entity: Class<Entity> | Entity, id: ?mixed): boolean {
        const entityClass = entity.getClassName();
        if (!this.getPool()[entityClass]) {
            return false;
        }

        const entityId = entity instanceof Entity ? entity.id : id;
        return typeof this.getPool()[entityClass][entityId] !== "undefined";
    }

    remove(entity: Entity): this {
        if (!this.getPool()[entity.constructor.name]) {
            return this;
        }

        delete this.getPool()[entity.constructor.name][entity.id];
        return this;
    }

    get(entity: Class<Entity> | Entity, id: ?mixed): ?Entity {
        const entityClass = entity.getClassName();
        if (!this.getPool()[entityClass]) {
            return undefined;
        }

        const entityId = entity instanceof Entity ? entity.id : id;
        const poolEntry: EntityPoolEntry = this.getPool()[entityClass][entityId];
        if (poolEntry) {
            return poolEntry.getEntity();
        }
        return undefined;
    }

    flush(): this {
        this.pool = {};
        return this;
    }
}

export default EntityPool;
