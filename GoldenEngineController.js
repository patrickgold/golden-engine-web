/**
 * @module patrickgold/golden-engine-web
 * 
 * Module file for GoldenEngine.
 * 
 * This file contains the controller class for the module GoldenEngine.
 * 
 * @file This file defines: Controller2D
 * @author Patrick Goldinger
 * @license MIT
 */

const GOLDEN_ENGINE_CONTROLLER_JS = true;


/**
 * The controller for the web application.
 */
class Controller2D {
    /**
     * Creates a new instance of Controller2D.
     * @param {Point2D} camPos The initial camera position.
     */
    constructor(camPos) {
        this._ = {
            cameraPosition: new Point2D(0,0),
            scale: new Vector2D(1,1)
        }
        this.cameraPosition = camPos;
    }

    /** Gets or sets the width for the rendering canvas. */
    get cameraPosition() { return this._.cameraPosition; }
    set cameraPosition(v) { 
        if (v instanceof Point2D) {
            this._.cameraPosition = v;
        }
    }
    /** Gets or sets the scale for the rendering canvas cam. */
    get scale() { return this._.scale; }
    set scale(v) { 
        if (v instanceof Vector2D) {
            this._.scale = v;
        }
    }
}
