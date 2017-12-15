/*
    Author:     Andrew Douglas
    Date:       19/10/2015
    Student No: 11362345

    Scene objects

*/

import MV from '../common/MV';

class Scene {

    constructor() {

        this.Colors = {
            green0: MV.vec4(0.0, 0.8, 0.2, 1.0),
            green1: MV.vec4(0.0, 0.4, 0.0, 1.0),
            green2: MV.vec4(0.08, 0.2, 0.0, 1.0),
            green3: MV.vec4(0.08, 0.5, 0.0, 1.0),
            green4: MV.vec4(0.08, 0.3, 0.0, 1.0),
            green5: MV.vec4(0.07, 0.2, 0.0, 1.0),
            green6: MV.vec4(0.05, 0.3, 0.0, 1.0),
            green7: MV.vec4(0.02, 0.5, 0.0, 1.0),

            // Browns
            brown0: MV.vec4(0.6, 0.2, 0.0, 1.0),
            brown1: MV.vec4(0.2, 0.09, 0.0, 1.0),
            brown2: MV.vec4(0.4, 0.2, 0.0, 1.0),
            brown3: MV.vec4(0.6, 0.34, 0.0, 1.0),

            pale: MV.vec4(0.9, 0.6, 0.3, 1.0),
            grey: MV.vec4(0.5, 0.5, 0.4, 1.0),
            road: MV.vec4(0.6, 0.6, 0.6, 1.0),
            red: MV.vec4(1.0, 0.0, 0.0, 1.0)
        };

        this.treeSizes = [{
                    trunk: MV.vec3(1.0, 1.0, 1.0),
                    canopy: MV.vec3(7.0, 7.0, 7.0),
                },
                {
                    trunk: MV.vec3(1.5, 1.5, 1.5),
                    canopy: MV.vec3(7.0, 7.0, 10.0),
                },
                {
                    trunk: MV.vec3(2.0, 2.0, 2.0),
                    canopy: MV.vec3(8.0, 8.0, 12.0),
                },
                {
                    trunk: MV.vec3(1.5, 1.5, 1.5),
                    canopy: MV.vec3(7.0, 7.0, 10.0),
                },
                {
                    trunk: MV.vec3(1.0, 1.0, 1.0),
                    canopy: MV.vec3(7.0, 7.0, 7.0),
                },
                {
                    trunk: MV.vec3(1.5, 1.5, 1.5),
                    canopy: MV.vec3(7.0, 7.0, 10.0),
                },
                {
                    trunk: MV.vec3(2.0, 2.0, 2.0),
                    canopy: MV.vec3(8.0, 8.0, 12.0),
                },
                {
                    trunk: MV.vec3(1.5, 1.5, 1.5),
                    canopy: MV.vec3(7.0, 7.0, 10.0),
                },
                {
                    trunk: MV.vec3(1.0, 1.0, 1.0),
                    canopy: MV.vec3(7.0, 7.0, 7.0),
                },
                {
                    trunk: MV.vec3(1.5, 1.5, 1.5),
                    canopy: MV.vec3(7.0, 7.0, 10.0),
                },
                {
                    trunk: MV.vec3(2.0, 2.0, 2.0),
                    canopy: MV.vec3(8.0, 8.0, 12.0),
                },
                {
                    trunk: MV.vec3(1.5, 1.5, 1.5),
                    canopy: MV.vec3(7.0, 7.0, 10.0),
                },
                {
                    trunk: MV.vec3(1.0, 1.0, 1.0),
                    canopy: MV.vec3(7.0, 7.0, 7.0),
                },
                {
                    trunk: MV.vec3(1.5, 1.5, 1.5),
                    canopy: MV.vec3(7.0, 7.0, 10.0),
                },
                {
                    trunk: MV.vec3(1.5, 1.5, 1.5),
                    canopy: MV.vec3(7.0, 7.0, 10.0),
                },
                {
                    trunk: MV.vec3(2.0, 2.0, 2.0),
                    canopy: MV.vec3(8.0, 8.0, 12.0),
                }
            ],

            this.sizeIndicies = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],

            this.greens = [
                this.Colors.green1,
                this.Colors.green2,
                this.Colors.green3,
                this.Colors.green4,
                this.Colors.green5,
                this.Colors.green6,
                this.Colors.green7,
                this.Colors.green1,
                this.Colors.green2,
                this.Colors.green3,
                this.Colors.green4,
                this.Colors.green5,
                this.Colors.green6,
                this.Colors.green7,
                this.Colors.green1,
                this.Colors.green0
            ],

            this.greensIndicies = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],

            this.brownsIndicies = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],

            this.browns = [
                this.brown0,
                this.brown1,
                this.brown2,
                this.brown3,
                this.brown0,
                this.brown1,
                this.brown2,
                this.brown3,
                this.brown0,
                this.brown1,
                this.brown2,
                this.brown3,
                this.brown0,
                this.brown1,
                this.brown2,
                this.brown0
            ];
    }
}


export { Scene as default };