/**
 * @module patrickgold/golden-engine-web
 * 
 * Basic features for GoldenEngine.
 * 
 * This file contains all neccessary features like Points, Vectors,
 * Paths, Areas, Map, ... for building the main class GoldenEngine.
 * 
 * Note: all classes ending with "3D" have only been built because of
 *       the interest in calculating things in 3D space. They may or may
 *       not be removed in any further release of this Engine, so do NOT
 *       rely on them!
 * 
 * @file This file defines: 
 *          Line2D, Line3D, Point2D, Point3D, Vector2D, Vector3D, 
 *          Polygon2D, PassiveObject2D, ActiveObject2D, Rotation2D
 * @author Patrick Goldinger
 * @license MIT
 */

const GOLDEN_ENGINE_API_JS = true;

/** Can be used for sizes, where the renderer
 * should decide id for itself.
 */
const GANY = -1;



/**
 * Describes a Vector in a 2D scene.
 */
class Vector2D {
    /**
     * Describe a Vector.
     * @param {number} x Length in direction of x-axis.
     * @param {number} y Length in direction of y-axis.
     */
    constructor(x, y) {
        this._ = {
            x: !isNaN(x) ? x : 0,
            y: !isNaN(y) ? y : 0
        };
    }

    /** The length in direction of x-axis. */
    get x() { return this._.x; }
    /** The length in direction of y-axis. */
    get y() { return this._.y; }
    set x(v) { if (!isNaN(v)) this._.x = v; }
    set y(v) { if (!isNaN(v)) this._.y = v; }

    /**
     * Calculates the magnitude of the Vector.
     * @returns {number} The magnitude as positive number.
     */
    magnitude() {
        return Math.sqrt(this._.x ** 2 + this._.y ** 2);
    }

    /**
     * Adds any number of Vector2D or Point2D objects.
     * @param {...(Vector2D|Point2D)} vec A Vector2D or Point2D.
     * @returns {Vector2D} The sum of all passed vectors/points.
     */
    static add(vec) {
        var ret = new Vector2D(0,0);
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] instanceof Vector2D || arguments[i] instanceof Point2D) {
                ret.x += arguments[i].x;
                ret.y += arguments[i].y;
            }
        }
        return ret;
    }
    /**
     * Subtracts any number of Vector2D or Point2D objects from each other.
     * @param {...(Vector2D|Point2D)} vec A Vector2D or Point2D.
     * @returns {Vector2D} The difference of all passed vectors/points.
     */
    static sub(vec) {
        var ret = null;
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] instanceof Vector2D || arguments[i] instanceof Point2D) {
                if (ret == null) {
                    ret = new Vector2D(arguments[i].x, arguments[i].y);
                }
                else {
                    ret.x -= arguments[i].x;
                    ret.y -= arguments[i].y;
                }
            }
        }
        return ret == null ? new Vector2D(0,0) : ret;
    }
}



/**
 * Describes a Vector in a 3D scene.
 */
class Vector3D {
    /**
     * Describe a Vector.
     * @param {number} x Length in direction of x-axis.
     * @param {number} y Length in direction of y-axis.
     * @param {number} z Length in direction of z-axis.
     */
    constructor(x, y, z) {
        this._ = {
            x: !isNaN(x) ? x : 0,
            y: !isNaN(y) ? y : 0,
            z: !isNaN(z) ? z : 0
        };
    }

    /** The length in direction of x-axis. */
    get x() { return this._.x; }
    /** The length in direction of y-axis. */
    get y() { return this._.y; }
    /** The length in direction of z-axis. */
    get z() { return this._.z; }
    set x(v) { if (!isNaN(v)) this._.x = v; }
    set y(v) { if (!isNaN(v)) this._.y = v; }
    set z(v) { if (!isNaN(v)) this._.z = v; }

    /**
     * Calculates the magnitude of the Vector.
     * @returns {number} The magnitude as positive number.
     */
    magnitude() {
        return Math.sqrt(this._.x ** 2 + this._.y ** 2 + this._.z ** 2);
    }

    /**
     * Adds any number of Vector3D or Point3D objects.
     * @param {...(Vector3D|Point3D)} vec A Vector3D or Point3D.
     * @returns {Vector3D} The sum of all passed vectors/points.
     */
    static add(vec) {
        var ret = new Vector3D(0,0,0);
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] instanceof Vector3D || arguments[i] instanceof Point3D) {
                ret.x += arguments[i].x;
                ret.y += arguments[i].y;
                ret.z += arguments[i].z;
            }
        }
        return ret;
    }
    /**
     * Subtracts any number of Vector3D or Point3D objects from each other.
     * @param {...(Vector3D|Point3D)} vec A Vector3D or Point3D.
     * @returns {Vector3D} The difference of all passed vectors/points.
     */
    static sub(vec) {
        var ret = null;
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] instanceof Vector3D || arguments[i] instanceof Point3D) {
                if (ret == null) {
                    ret = new Vector3D(arguments[i].x, arguments[i].y, arguments[i].z);
                }
                else {
                    ret.x -= arguments[i].x;
                    ret.y -= arguments[i].y;
                    ret.z -= arguments[i].z;
                }
            }
        }
        return ret == null ? new Vector3D(0,0,0) : ret;
    }
}



/**
 * Describes a Point in a 2D scene.
 * @property {number} x The x-coordinate of the Point.
 * @property {number} y The y-coordinate of the Point.
 */
class Point2D extends Vector2D {
    /**
     * Describe a Point.
     * @param {number} x The x-coordinate of the Point.
     * @param {number} y The y-coordinate of the Point.
     */
    constructor(x, y) {
        super(x, y);
    }
}



/**
 * Describes a Point in a 3D scene.
 * @property {number} x The x-coordinate of the Point.
 * @property {number} y The y-coordinate of the Point.
 * @property {number} z The z-coordinate of the Point.
 */
class Point3D extends Vector3D {
    /**
     * Describe a Point.
     * @param {number} x The x-coordinate of the Point.
     * @param {number} y The y-coordinate of the Point.
     * @param {number} z The z-coordinate of the Point.
     */
    constructor(x, y, z) {
        super(x, y, z);
    }
}



/**
 * Describes a Line in a 2D scene.
 */
class Line2D {
    /**
     * Describe a Line.
     * @param {Point2D} point A point the Lines passes through.
     * @param {Vector2D} direction The direction the Line goes.
     */
    constructor(point, direction) {
        this._ = {
            point: point instanceof Point2D ? point : new Point2D(0, 0),
            direction: direction instanceof Vector2D ? direction : new Vector2D(0, 0)
        };
    }

    /** The starting point of the Line. */
    get point() { return this._.point; }
    /** The direction of the Line. */
    get direction() { return this._.direction; }
    set point(v) { if (v instanceof Point2D) this._.point = v; }
    set direction(v) { if (v instanceof Vector2D) this._.direction = v; }
}



/**
 * Describes a Line in a 3D scene.
 */
class Line3D {
    /**
     * Describe a Line.
     * @param {Point3D} point A point the Lines passes through.
     * @param {Vector3D} direction The direction the Line goes.
     */
    constructor(point, direction) {
        this._ = {
            point: point instanceof Point3D ? point : new Point3D(0, 0),
            direction: direction instanceof Vector3D ? direction : new Vector3D(0, 0)
        };
    }

    /** The starting point of the Line. */
    get point() { return this._.point; }
    /** The direction of the Line. */
    get direction() { return this._.direction; }
    set point(v) { if (v instanceof Point3D) this._.point = v; }
    set direction(v) { if (v instanceof Vector3D) this._.direction = v; }
}



/**
 * Describes a Rotation of a ...Object2D in a 2D scene.
 */
class Rotation2D {
    /**
     * Describe a Rotation.
     * @param {number} rvalue The value of the rotation in degrees, >0 for clockwise, else <0.
     */
    constructor(rvalue) {
        this._ = {
            rvalue: 0
        };
        this.rvalue = rvalue;
    }

    /** The value of the rotation in degrees, >0 for clockwise, else <0. */
    get rvalue() { return this._.rvalue; }
    set rvalue(v) { if (!isNaN(v)) this._.rvalue = v; }
}



/**
 * Describes a CanvasColor.
 */
class CanvasColor {
    /**
     * Describe a CanvasColor.
     * @param {string} value A valid CSS color (rgb, hex, hsl or color name).
     */
    constructor(value) {
        this._ = {
            value: "#000"
        };
        this.value = value;
    }

    /** Gets or sets the value of the CanvasColor. */
    get value() { return this._.value; }
    set value(v) {
        if (typeof v === "string") {
            this._.value = v;
        }
    }
}



/**
 * Describes a Polygon in a 2D scene.
 */
class Polygon2D {
    /**
     * Describe a Polygon.
     * @param {Array.<Point2D>} points Array of points (min 3 elements for valid shape).
     */
    constructor(points) {
        this._ = {
            points: []
        };
        this.points = points;
    }

    /** Array of points (min 3 elements for valid shape). */
    get points() { return this._.points; }
    set points(v) {
        if (Array.isArray(v)) {
            this._.points.length = 0; // clear the previous entries
            for (var i = 0; i < v.length; i++) {
                if (v[i] instanceof Point2D) {
                    this._.points.push(v[i])
                }
            }
        }
    }

    /**
     * Calculates the perimeter of the Polygon2D.
     * @returns {number} The perimeter of the shape.
     */
    perimeter() {
        // given that all elements of this._.points are Point2D's...
        if (this.points.length < 3) {
            console.error("Fatal error at Polygon2D.perimeter(): Cannot calculate the perimeter of an invalid shape!");
            return 0;
        }
        else {
            var peri = 0;
            for (var i = 0; i < this._.points.length; i++) {
                peri += Vector2D.sub(this._.points[(i+1) % this._.points.length], this._.points[i]).magnitude();
            }
            return peri;
        }
    }
}



/**
 * Describes a PassiveObject in a 2D scene.
 */
class PassiveObject2D {
    /**
     * Describe a PassiveObject.
     * @param {Object} settings Initial settings.
     * @param {Image} settings.data The svg or image for rendering the PassiveObejct.
     * @param {string} settings.id The ID of the PassiveObejct.
     * @param {Point2D} settings.position The position of the PassiveObejct.
     * @param {Rotation2D} [settings.rotation] The rotation of the PassiveObejct, defaults to 0deg.
     * @param {Vector2D} [settings.scale] The scale of the PassiveObejct, defaults to 1/1.
     * @param {Vector2D} [settings.size] The size of the PassiveObejct.
     */
    constructor(settings) {
        if (settings !== Object(settings)) {
            settings = {};
        }
        this._ = {
            _rawImageData: null,
            _rawImageDataCanvas: document.createElement("canvas"),
            data: new Image(),
            id: "0",
            position: new Point2D(0,0),
            renderHeight: 0,
            renderWidth: 0,
            rotation: new Rotation2D(0),
            scale: new Vector2D(1,1),
            size: new Vector2D(GANY,GANY)
        };
        this.data = settings.data;
        this.id = settings.id;
        this.position = settings.position;
        this.scale = settings.scale;
        this.size = settings.size;
        this.prepareRawImageData();
        //document.getElementById("entry").appendChild(this._._rawImageDataCanvas);
    }

    get data() { return this._.data; }
    set data(v) {
        if (v instanceof Image) {
            this._.data = v;
            this.prepareRawImageData();
        }
    }
    /** Gets or sets the ID of the PassiveObejct on a 2D map. */
    get id() { return this._.id; }
    set id(v) {
        if (typeof v === "string") {
            this._.id = v;
            this.prepareRawImageData();
        }
    }
    /** Gets or sets the position of the PassiveObejct on a 2D map. */
    get position() { return this._.position; }
    set position(v) {
        if (v instanceof Point2D) {
            this._.position = v;
            this.prepareRawImageData();
        }
    }
    /** Gets the render height of the PassiveObejct on a 2D map. */
    get renderHeight() { return this._.renderHeight; }
    /** Gets the render width of the PassiveObejct on a 2D map. */
    get renderWidth() { return this._.renderWidth; }
    /** Gets or sets the rotation of the PassiveObejct on a 2D map. */
    get rotation() { return this._.rotation; }
    set rotation(v) {
        if (v instanceof Rotation2D) {
            this._.rotation = v;
            this.prepareRawImageData();
        }
    }
    /** Gets or sets the scale for the PassiveObejct on a 2D map. */
    get scale() { return this._.scale; }
    set scale(v) {
        if (v instanceof Vector2D) {
            this._.scale = v;
            this.prepareRawImageData();
        }
    }
    /** Gets or sets the size of the PassiveObejct on a 2D map. */
    get size() { return this._.size; }
    set size(v) {
        if (v instanceof Vector2D) {
            this._.size = v;
            this.prepareRawImageData();
        }
    }

    /**
     * Prepares the object's raw image data for rendering process later.
     * @returns {boolean} True or false for success/no success.
     */
    prepareRawImageData() {
        var rctx = this._._rawImageDataCanvas.getContext("2d");
        if (this.data instanceof Image) {
            var dWidth = this.size.x >= 0 ? this.size.x : this.data.width;
            dWidth = this.scale.x >= 0 ? dWidth * this.scale.x : dWidth;
            var dHeight = this.size.y >= 0 ? this.size.y : this.data.height;
            dHeight = this.scale.y >= 0 ? dHeight * this.scale.y : dHeight;
            this._._rawImageDataCanvas.width = dWidth;
            this._.renderWidth = dWidth;
            this._._rawImageDataCanvas.height = dHeight;
            this._.renderHeight = dHeight;
            rctx.drawImage(this.data, 0, 0, dWidth, dHeight);
            if (this._._rawImageDataCanvas.width == 0 || this._._rawImageDataCanvas.height == 0) {
                this._._rawImageData = rctx.createImageData(1,1);
            }
            else {
                this._._rawImageData = rctx.getImageData(0,0,this._._rawImageDataCanvas.width,this._._rawImageDataCanvas.height);
            }
            this._._dataURL = this._._rawImageDataCanvas.toDataURL("image/png");
            return true;
        }
        return false;
    }
    /**
     * Returns the object's raw image data for rendering process later.
     * @returns {ImageData} The canvas raw image data.
     */
    getRawImageData() {
        return this._._rawImageData;
    }
    /**
     * Returns the object's data URL for rendering process later.
     * @returns {string} The canvas data URL in image/png 96dpi.
     */
    getDataURL() {
        return this._._dataURL;
    }
}



/**
 * Describes a ActiveObject in a 2D scene.
 */
class ActiveObject2D {
    /**
     * Describe a ActiveObject.
     * @param {Object} settings Initial settings.
     * @param {(SVGElement|Image)} settings.data The svg or image for rendering the ActiveObejct.
     * @param {string} settings.id The ID of the ActiveObejct.
     * @param {Point2D} settings.position The position of the ActiveObejct.
     * @param {Rotation2D} [settings.rotation] The rotation of the ActiveObejct, defaults to 0deg.
     * @param {Vector2D} [settings.scale] The scale of the ActiveObejct, defaults to 1/1.
     * @param {Vector2D} [settings.size] The size of the ActiveObejct.
     */
    constructor(settings) {
        if (settings !== Object(settings)) {
            settings = {};
        }
        this._ = {
            data: new Image(),
            id: "0",
            position: new Point2D(0,0),
            rotation: new Rotation2D(0),
            scale: new Vector2D(1,1),
            size: new Vector2D(GANY,GANY)
        };
        this.data = settings.data;
        this.id = settings.id;
        this.position = settings.position;
        this.scale = settings.scale;
        this.size = settings.size;
    }

    /** Gets or sets the svg or image for rendering the ActiveObejct on a 2D map. */
    get data() { return this._.data; }
    set data(v) {
        if (v instanceof SVGElement || v instanceof Image) {
            this._.data = v;
        }
    }
    /** Gets or sets the ID of the ActiveObejct on a 2D map. */
    get id() { return this._.id; }
    set id(v) {
        if (typeof v === "string") {
            this._.id = v;
        }
    }
    /** Gets or sets the position of the ActiveObejct on a 2D map. */
    get position() { return this._.position; }
    set position(v) {
        if (v instanceof Point2D) {
            this._.position = v;
        }
    }
    /** Gets or sets the rotation of the ActiveObejct on a 2D map. */
    get rotation() { return this._.rotation; }
    set rotation(v) {
        if (v instanceof Rotation2D) {
            this._.rotation = v;
        }
    }
    /** Gets or sets the scale for the ActiveObejct on a 2D map. */
    get scale() { return this._.scale; }
    set scale(v) {
        if (v instanceof Vector2D) {
            this._.scale = v;
        }
    }
    /** Gets or sets the size of the ActiveObejct on a 2D map. */
    get size() { return this._.size; }
    set size(v) {
        if (v instanceof Vector2D) {
            this._.size = v;
        }
    }
}

