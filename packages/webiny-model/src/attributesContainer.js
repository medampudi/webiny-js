// @flow
import type { Model, Attribute } from ".";

/**
 * Base AttributesContainer class, can be extended to implement new types of model attributes.
 */
class AttributesContainer {
    parentModel: Model;
    name: string;

    constructor(model: Model) {
        /**
         * Parent parentModel - instance of Model class.
         */
        this.parentModel = model;

        /**
         * Name of current attribute
         */
        this.name = "";
    }

    attr(attribute: string): AttributesContainer {
        this.name = attribute;
        return this;
    }

    getParentModel(): Model {
        return this.parentModel;
    }

    custom(attribute: Class<Attribute>) {
        const model = this.getParentModel();
        const args = Array.from(arguments);
        args.shift();
        model.setAttribute(this.name, new attribute(this.name, this, ...args));
        return model.getAttribute(this.name);
    }
}

export default AttributesContainer;
