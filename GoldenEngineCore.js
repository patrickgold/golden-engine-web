/**
 * @module patrickgold/golden-engine-web
 * 
 * Core module file for GoldenEngine.
 * 
 * This file contains the main core for the module GoldenEngine
 *  and the DataCache for saving resources and faster rendering.
 * 
 * @file This file defines: GoldenEngine
 * @author Patrick Goldinger
 * @license MIT
 * 
 * @version 0.1.2
 */

const GOLDEN_ENGINE_JS = true;



/**
 * The core of the web game.
 */
class GoldenEngine {
    /**
     * Creates a new instance of GoldenEngine.
     * @param {HTMLElement} screen The canvas drawing area.
     * @param {number} width The width of the screen in pixels.
     * @param {number} height The height of the screen in pixels.
     */
    constructor(screen, width, height) {
        this._ = {
            controller: new Controller2D(),
            dataCache: new DataCache(),
            doRenderLoop: false,
            map: new Map2D(GoldenEngine.getClientWidth(), GoldenEngine.getClientHeight()),
            requestID: 0,
            screen: document.createElement("canvas"),
            width: GoldenEngine.getClientWidth(),
            height: GoldenEngine.getClientHeight()
        }
        this.screen = screen;
        this.width = width;
        this.height = height;

        // define requestAnimationFrame functions and fallbacks, if browsers not support it.
        window.requestAnimationFrame = window.requestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function(f) { return setTimeout(f, 1000/30); };
        window.cancelAnimationFrame = window.cancelAnimationFrame
            || window.mozCancelAnimationFrame
            || function(requestID) { clearTimeout(requestID); };
    }
    
    /** Gets or sets the controller for the rendering canvas. */
    get controller() { return this._.controller; }
    set controller(v) { 
        if (v instanceof Controller2D) {
            this._.controller = v;
            this.prepareRenderer();
        }
    }
    /** Gets or sets the data cache for the engine's objects. */
    get dataCache() { return this._.dataCache; }
    set dataCache(v) { 
        if (v instanceof DataCache) {
            this._.dataCache = v;
            this.prepareRenderer();
        }
    }
    /** Gets or sets the renderloop boolean. */
    get doRenderLoop() { return this._.doRenderLoop; }
    set doRenderLoop(v) { 
        if (typeof v === "boolean") {
            if (v && !this._.doRenderLoop) {
                this.beginRenderLoop();
            }
            else if (!v && this._.doRenderLoop) {
                this.stopRenderLoop();
            }
        }
        return v;
    }
    /** Gets or sets the width for the rendering canvas. */
    get height() { return this._.height; }
    set height(v) { 
        if (!isNaN(v)) {
            this._.height = v;
            this.prepareRenderer();
        }
    }
    /** Gets or sets the map for the rendering canvas. */
    get map() { return this._.map; }
    set map(v) { 
        if (v instanceof Map2D) {
            this._.map = v;
            this.prepareRenderer();
        }
    }
    /** Gets or sets the rendering cancas refernece. */
    get screen() { return this._.screen; }
    set screen(v) { 
        if (typeof v.getContext === "function" && v instanceof HTMLElement) {
            this._.screen = v;
            this.prepareRenderer();
        }
    }
    /** Gets or sets the width for the rendering canvas. */
    get width() { return this._.width; }
    set width(v) { 
        if (!isNaN(v)) {
            this._.width = v;
            this.prepareRenderer();
        }
    }

    /** This function prepares the renderer to adopt to environment changes. */
    prepareRenderer() {
        this._.screen.setAttribute("width", this._.width);
        this._.screen.setAttribute("height", this._.height);
        var ctx = this._.screen.getContext("2d");
        ctx.font = "bold 12px sans-serif";
        ctx.fillStyle = "#000";
        ctx.setTransform(1,0,0,1,0,0);
        return true;
    }
    beginRenderLoop() {
        this._.doRenderLoop = true;
        this._.requestID = requestAnimationFrame(this.coreRenderStep.bind(this));
    }
    stopRenderLoop() {
        this._.doRenderLoop = false;
        cancelAnimationFrame(this._.requestID);
    }
    coreRenderStep() {
        console.info("coreRenderStep()");
        var ctx = this._.screen.getContext("2d");
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,this._.width,this._.height);
        // calculate camera window for map
        var cam = {
            height: GoldenEngine.getClientHeight() * this._.controller.scale.y,
            width: GoldenEngine.getClientWidth() * this._.controller.scale.x,
            position: this._.controller.cameraPosition,
            minX: 0,
            maxX: 0,
            minY: 0,
            minY: 0,
        }
        cam.minX = cam.position.x - 1;
        cam.maxX = cam.position.x + cam.width + 1;
        cam.minY = cam.position.y - 1;
        cam.maxY = cam.position.y + cam.height + 1;
        //console.log(cam);
        // main loop through all layers (already sorted)
        var layers = this._.map.getLayers();
        for (var i = 0; i < layers.length; i++) {
            // draw background
            if (layers[i].background.data instanceof CanvasColor) {
                if (layers[i].background.data.value != "transparent") {
                    ctx.fillStyle = layers[i].background.data.value;
                    ctx.fillRect(0,0,this._.width,this._.height);
                }
            }
            else if (layers[i].background.data instanceof PassiveObject2D) {
                //
            }
            else if (layers[i].background.data instanceof Grid2D) {
                /** @type {Grid2D} */
                var grid = layers[i].background.data;
                var renderStep = new Vector2D(
                    grid.blockCalcWidth * (this._.width / cam.width),
                    grid.blockCalcHeight * (this._.height / cam.height)
                );
                var offset = new Vector2D(
                    grid.position.x % renderStep.x,
                    grid.position.y % renderStep.y
                );
                // set style parameters
                ctx.lineWidth = grid.lineThickness;
                ctx.strokeStyle = grid.lineColor.value;
                // draw vertical lines
                for (var j = offset.x; j < cam.width; j += renderStep.x) {
                    ctx.beginPath();
                    ctx.moveTo(j, 0);
                    ctx.lineTo(j, this._.height);
                    ctx.stroke();
                }
                // draw horizontal lines
                for (var j = offset.y; j < cam.height; j += renderStep.y) {
                    ctx.beginPath();
                    ctx.moveTo(0, j);
                    ctx.lineTo(this._.width, j);
                    ctx.stroke();
                }
            }
            // draw objects
            var objects = layers[i].getObjects();
            for (var j = 0; j < objects.length; j++) {
                var obj = objects[j];//console.log(obj);
                //if (!(obj instanceof PassiveObject2D || obj instanceof ActiveObject2D)) continue;
                // calculate if object is out of sight
                if (obj.position.x > cam.maxX 
                    || obj.position.x + obj.renderWidth < cam.minX
                    || obj.position.y > cam.maxY 
                    || obj.position.y + obj.renderHeight < cam.minY)
                    continue;
                // if not draw image data
                ctx.drawImage(
                    obj.data, 
                    obj.position.x - cam.position.x, 
                    obj.position.y - cam.position.y,
                    obj.renderWidth * (this._.width / cam.width), 
                    obj.renderHeight * (this._.height / cam.height)
                );
            }
        }
        this._.requestID = requestAnimationFrame(this.coreRenderStep.bind(this));
    }

    /**
     * Gets the client width of the browser, in pixels.
     * @returns {number} Returns the width in pixels.
     */
    static getClientWidth() {
        return Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.documentElement.clientWidth
        );
    }
    /**
     * Gets the client height of the browser, in pixels.
     * @returns {number} Returns the height in pixels.
     */
    static getClientHeight() {
        return Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.documentElement.clientHeight
        );
    }
}



/**
 * @typedef {Object} DataCacheObjectIn
 * @property {Image} data The image data.
 * @property {string} id The ID of the object.
 */
/**
 * @typedef {Object} DataCacheObjectOut
 * @property {Image} data The image data.
 * @property {string} id The ID of the object.
 * @property {boolean} validFlag Specifies if the object with the given ID has been found.
 */

/**
 * The data cache for game objects.
 */
class DataCache {
    /**
     * Creates a new instance of GoldenEngine DataCache.
     * @param {DataCacheObjectIn} [initialDataCache] Initial data cache.
     */
    constructor(initialDataCache) {
        this.__storage__ = {};
    }

    /** 
     * Gets an object from cache by ID.
     * @param {string} id The ID of the object.
     * @returns {DataCacheObjectOut} The object by ID.
     */
    getObject(id) {
        var data = new Image();
        var validFlag = false;
        if (typeof id === "string") {
            if (this.__storage__.hasOwnProperty(id)) {
                data = this.__storage__[id];
                validFlag = true;
            }
        }
        return { data: data, id: id, validFlag: validFlag };
    }
    /** 
     * This function prepares the renderer to adopt to environment changes.
     * @param {Array.<DataCacheObjectIn>} list The list as key (object-ID) => value (source-url) object.
     * @param {function} [triggerCallback] Triggered everytime a image is loaded.
     * @param {function} [finalCallback] Triggered when all images have loaded.
     */
    loadDataList(list, triggerCallback, finalCallback) {
        if (!Array.isArray(list)) {
            return false;
        }
        var storage = this.__storage__;
        var loadedCount = 0;
        var listLength = list.length;
        function imageEventHandler(status) {
            loadedCount++;
            if (triggerCallback) triggerCallback({
                id: this.id,
                index: loadedCount,
                listLength: listLength,
                status: status
            });
            if (status == "success") {
                this.error = null;
                this.onload = null;
                console.info("%cSuccessfully loaded image '" + this.src + "'.", "color: green");
            }
            else if (status == "error") {
                console.error("Error while loading image '" + this.src + "'.");
                storage[this.id] = new Image();
            }
            if (loadedCount == listLength && finalCallback)
                finalCallback();
        }
        for (var i = 0; i < list.length; i++) {
            if (list[i] === Object(list[i])) {
                if (list[i].hasOwnProperty("id") && list[i].hasOwnProperty("src")) {
                    var img = new Image();
                    img.onerror = function () { imageEventHandler.call(this, "error"); };
                    img.onload = function () { imageEventHandler.call(this, "success"); };
                    storage[list[i].id] = img;
                    img.id = list[i].id;
                    img.src = list[i].src;
                    console.info("Loading image '" + img.src + "'...");
                }
                else {
                    listLength--;
                }
            }
            else {
                listLength--;
            }
        }
        return true;
    }
    /** 
     * Releases all objects in cache. Note that they will only be deleted
     * once the memory is full and javascript decides to actually overwrite it.
     * @returns {number} The number of released items.
     */
    releaseObjects() {
        var n = 0;
        for (var k in this.__storage__) {
            if (this.__storage__.hasOwnProperty(k)) {
                delete this.__storage__[k];
                n++;
            }
        }
        return n;
    }
}
