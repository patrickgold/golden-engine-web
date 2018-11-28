/**
 * @module patrickgold/golden-engine-web
 * 
 * Module file for GoldenEngine.
 * 
 * This file contains the map class for the module GoldenEngine.
 * 
 * @file This file defines: Background2D, Grid2D, Layer2D, Map2D
 * @author Patrick Goldinger
 * @license MIT
 */

const GOLDEN_ENGINE_MAP_JS = true;



/**
 * The map for the web application.
 */
class Map2D {
    /**
     * Creates a new instance of Map2D.
     * @param {number} width The width of the map in pixels.
     * @param {number} height The height of the map in pixels.
     */
    constructor(width, height) {
        this._ = {
            height: GoldenEngine.getClientHeight(),
            layer: [],
            width: GoldenEngine.getClientWidth()
        }
        this.height = height;
        this.width = width;
    }

    /** Gets or sets the width for the rendering canvas. */
    get height() { return this._.height; }
    set height(v) { 
        if (!isNaN(v)) {
            this._.height = v;
        }
    }
    /** Gets or sets the width for the rendering canvas. */
    get width() { return this._.width; }
    set width(v) { 
        if (!isNaN(v)) {
            this._.width = v;
        }
    }

    /**
     * Adds a new Layer2D to the Map2D.
     * @param {Layer2D} layer The layer class object.
     * @returns {string} The name of the layer.
     */
    addLayer(layer) {
        if (layer instanceof Layer2D) {
            this._.layer.push(layer);
            return layer.name;
        }
    }
    /**
     * Gets a Layer2D by name.
     * @param {string} name The name of the layer.
     * @returns {Layer2D} The wanted layer.
     */
    getLayer(name) {
        if (typeof name === "string") {
            for (var i = 0; i < this._.layer.length; i++) {
                if (this._.layer[i].name === name) {
                    return this._.layer[i];
                }
            }
            throw new Error("No Layer2D with name \"" + name + "\" has been found!");
        }
        throw new TypeError("Argument 1 [name]: type must be string!");
    }
    /**
     * Gets all layer.
     * @returns {Array.<Layer2D>} All layer.
     */
    getLayers() {
        return this._.layer = this._.layer.sort(function (a, b) {
            return a.ordernum - b.ordernum;
        });
    }
    /**
     * Removes a Layer2D by name.
     * @param {string} name The name of the layer.
     * @returns {Layer2D} The removed layer.
     */
    removeLayer(name) {
        if (typeof name === "string") {
            for (var i = 0; i < this._.layer.length; i++) {
                if (this._.layer[i].name === name) {
                    return this._.layer.splice(i, 1);
                }
            }
            throw new Error("No Layer2D with name \"" + name + "\" has been found!");
        }
        throw new TypeError("Argument 1 [name]: type must be string!");
    }
    /**
     * Removes all layer.
     */
    removeAllLayer() {
        this._.layer.length = 0;
    }
}



/**
 * The layer for a Map2D.
 */
class Layer2D {
    /**
     * Creates a new instance of Layer2D.
     * @param {string} name The name of the layer.
     * @param {number} [ordernum] The order number of the layer, defaults to -1 (unsorted).
     */
    constructor(name, ordernum) {
        this._ = {
            background: new Background2D(),
            name: "layer",
            objects: [],
            ordernum: -1
        }
        this.name = name;
        this.ordernum = ordernum;
    }

    /** Gets or sets the background of the layer. */
    get background() { return this._.background; }
    set background(v) { 
        if (typeof v === "string") {
            this._.backgroundColor = v;
        }
    }
    /** Gets or sets the name of the layer. */
    get name() { return this._.name; }
    set name(v) { 
        if (typeof v === "string") {
            this._.name = v;
        }
    }
    /** Gets or sets the order number of the layer. */
    get ordernum() { return this._.ordernum; }
    set ordernum(v) { 
        if (!isNaN(v)) {
            if (v >= 0 || v == -1) {
                this._.ordernum = v;
            }
        }
    }

    /**
     * Adds a new object to the Layer2D.
     * @param {(PassiveObject2D|ActiveObject2D)} obj A passive or active object.
     * @returns {string} The ID of the passed object.
     */
    addObject(obj) {
        if (obj instanceof PassiveObject2D || obj instanceof ActiveObject2D) {
            this._.objects.push(obj);
            return obj.id;
        }
    }
    /**
     * Gets a object by id.
     * @param {string} id The id of the object.
     * @returns {(PassiveObject2D|ActiveObject2D)} The wanted item.
     */
    getObject(id) {
        if (typeof id === "string") {
            for (var i = 0; i < this._.objects.length; i++) {
                if (this._.objects[i].id === id) {
                    return this._.objects[i];
                }
            }
            throw new Error("No object with id \"" + id + "\" has been found!");
        }
        throw new TypeError("Argument 1 [id]: type must be string!");
    }
    /**
     * Gets all objects.
     * @returns {Array.<(PassiveObject2D|ActiveObject2D)>} All objects.
     */
    getObjects() {
        return this._.objects;
    }
    /**
     * Removes a object by id.
     * @param {string} id The id of the object.
     * @returns {(PassiveObject2D|ActiveObject2D)} The removed item.
     */
    removeObject(id) {
        if (typeof id === "string") {
            for (var i = 0; i < this._.objects.length; i++) {
                if (this._.objects[i].id === id) {
                    return this._.objects.splice(i, 1);
                }
            }
            throw new Error("No object with id \"" + id + "\" has been found!");
        }
        throw new TypeError("Argument 1 [id]: type must be string!");
    }
    /**
     * Removes all objects.
     */
    removeAllObjects() {
        this._.objects.length = 0;
    }
}



/**
 * The background for a Layer2D.
 */
class Background2D {
    /**
     * Describe a Background2D.
     * @param {(PassiveObject2D|CanvasColor|Grid2D)} [data] The object or color for rendering the Background2D.
     */
    constructor(data) {
        this._ = {
            data: new CanvasColor("transparent")
        };
        this.data = data;
    }

    /** Gets or sets the data of the background. */
    get data() { return this._.data; }
    set data(v) { 
        if (v instanceof PassiveObject2D || v instanceof CanvasColor || v instanceof Grid2D) {
            this._.data = v;
        }
    }
}



/**
 * The grid for a background for a Layer2D.
 */
class Grid2D {
    /**
     * Describe a Grid.
     * @param {Object} settings Initial settings.
     * @param {CanvasColor} settings.lineColor The line color for the grid.
     * @param {number} settings.lineThickness The line thickness for the grid.
     * @param {Point2D} [settings.position] The starting position of the Grid, defaults to 0/0.
     * @param {Rotation2D} [settings.rotation] The rotation of the Grid, defaults to 0deg.
     * @param {Vector2D} [settings.scale] The scale of the Grid, defaults to 1/1.
     * @param {Vector2D} settings.size The size of the Grid.
     */
    constructor(settings) {
        if (settings !== Object(settings)) {
            settings = {};
        }
        this._ = {
            lineColor: new CanvasColor("#000"),
            lineThickness: 1,
            position: new Point2D(0,0),
            rotation: new Rotation2D(0),
            scale: new Vector2D(1,1),
            size: new Vector2D(10,10)
        };
        this.lineColor = settings.lineColor;
        this.lineThickness = settings.lineThickness;
        this.position = settings.position;
        this.rotation = settings.rotation;
        this.scale = settings.scale;
        this.size = settings.size;
    }

    /** Gets the block calc height for a Grid2D on a 2D map. */
    get blockCalcHeight() {
        var ret = this._.size.y > 0 ? this._.size.y : 10;
        ret *= this._.scale.y > 0 ? this._.scale.y : 1;
        return ret;
    }
    /** Gets the block calc width for a Grid2D on a 2D map. */
    get blockCalcWidth() {
        var ret = this._.size.x > 0 ? this._.size.x : 10;
        ret *= this._.scale.x > 0 ? this._.scale.x : 1;
        return ret;
    }
    /** Gets or sets the line color of the grid. */
    get lineColor() { return this._.lineColor; }
    set lineColor(v) { 
        if (v instanceof CanvasColor) {
            this._.lineColor = v;
        }
    }
    /** Gets or sets the line thickness of the grid. */
    get lineThickness() { return this._.lineThickness; }
    set lineThickness(v) { 
        if (!isNaN(v)) {
            if (v >= 0) this._.lineThickness = v;
        }
    }
    /** Gets or sets the position of the grid. */
    get position() { return this._.position; }
    set position(v) { 
        if (v instanceof Point2D) {
            this._.position = v;
        }
    }
    /** Gets or sets the rotation of the grid. */
    get rotation() { return this._.rotation; }
    set rotation(v) { 
        if (v instanceof Rotation2D) {
            this._.rotation = v;
        }
    }
    /** Gets or sets the scale of the grid. */
    get scale() { return this._.size; }
    set scale(v) { 
        if (v instanceof Vector2D) {
            this._.scale = v;
        }
    }
    /** Gets or sets the size of the grid. */
    get size() { return this._.size; }
    set size(v) { 
        if (v instanceof Vector2D) {
            this._.size = v;
        }
    }
}

