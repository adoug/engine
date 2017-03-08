/*
    Author:     Andrew Douglas
    Date:       19/10/2015
    Student No: 11362345

    Scene objects 

*/

import MV from '../common/MV';

const Scene = {
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
    red: MV.vec4(1.0, 0.0, 0.0, 1.0),

    treeSizes: [
    {
        trunk: MV.vec3(1.0, 1.0, 1.0),
        canopy: MV.vec3(7.0, 7.0, 7.0)
    },
    {
        trunk: MV.vec3(1.5, 1.5, 1.5),
        canopy: MV.vec3(7.0, 7.0, 10.0)
    },
    {
        trunk: MV.vec3(2.0, 2.0, 2.0),
        canopy: MV.vec3(8.0, 8.0, 12.0)
    },
    {
        trunk: MV.vec3(1.5, 1.5, 1.5),
        canopy: MV.vec3(7.0, 7.0, 10.0)
    },
    {
        trunk: MV.vec3(1.0, 1.0, 1.0),
        canopy: MV.vec3(7.0, 7.0, 7.0)
    },
    {
        trunk: MV.vec3(1.5, 1.5, 1.5),
        canopy: MV.vec3(7.0, 7.0, 10.0)
    },
    {
        trunk: MV.vec3(2.0, 2.0, 2.0),
        canopy: MV.vec3(8.0, 8.0, 12.0)
    },
    {
        trunk: MV.vec3(1.5, 1.5, 1.5),
        canopy: MV.vec3(7.0, 7.0, 10.0)
    },
    {
        trunk: MV.vec3(1.0, 1.0, 1.0),
        canopy: MV.vec3(7.0, 7.0, 7.0)
    },
    {
        trunk: MV.vec3(1.5, 1.5, 1.5),
        canopy: MV.vec3(7.0, 7.0, 10.0)
    },
    {
        trunk: MV.vec3(2.0, 2.0, 2.0),
        canopy: MV.vec3(8.0, 8.0, 12.0)
    },
    {
        trunk: MV.vec3(1.5, 1.5, 1.5),
        canopy: MV.vec3(7.0, 7.0, 10.0)
    },
    {
        trunk: MV.vec3(1.0, 1.0, 1.0),
        canopy: MV.vec3(7.0, 7.0, 7.0)
    },
    {
        trunk: MV.vec3(1.5, 1.5, 1.5),
        canopy: MV.vec3(7.0, 7.0, 10.0)
    },
    {
        trunk: MV.vec3(2.0, 2.0, 2.0),
        canopy: MV.vec3(8.0, 8.0, 12.0)
    }],

    sizeIndicies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],

    greens: [
        this.green1,
        this.green2,
        this.green3,
        this.green4,
        this.green5,
        this.green6,
        this.green7,
        this.green1,
        this.green2,
        this.green3,
        this.green4,
        this.green5,
        this.green6,
        this.green7,
        this.green1
    ],

    greensIndicies: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
    ],

    brownsIndicies: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
    ],

    browns: [
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
        this.brown2
    ],
    rownsIndicies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
};

export { Scene as default }


