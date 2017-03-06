/*
    Author:     Andrew Douglas
    Date:       19/10/2015
    Student No: 11362345

    Scene objects 

*/

// Colours

// Greens
var green0 = vec4(0.0, 0.8, 0.2, 1.0);
var green1 = vec4(0.0, 0.4, 0.0, 1.0);
var green2 = vec4(0.08, 0.2, 0.0, 1.0);
var green3 = vec4(0.08, 0.5, 0.0, 1.0);
var green4 = vec4(0.08, 0.3, 0.0, 1.0);
var green5 = vec4(0.07, 0.2, 0.0, 1.0);
var green6 = vec4(0.05, 0.3, 0.0, 1.0);
var green7 = vec4(0.02, 0.5, 0.0, 1.0);

// Browns
var brown0 = vec4(0.6, 0.2, 0.0, 1.0);
var brown1 = vec4(0.2, 0.09, 0.0, 1.0);
var brown2 = vec4(0.4, 0.2, 0.0, 1.0);
var brown3 = vec4(0.6, 0.34, 0.0, 1.0);

var pale = vec4(0.9, 0.6, 0.3, 1.0);
var grey = vec4(0.5, 0.5, 0.4, 1.0);
var road = vec4(0.6, 0.6, 0.6, 1.0);
var red = vec4(1.0, 0.0, 0.0, 1.0);

var treeSizes = [
{
    trunk: vec3(1.0, 1.0, 1.0),
    canopy: vec3(7.0, 7.0, 7.0)
},
{
    trunk: vec3(1.5, 1.5, 1.5),
    canopy: vec3(7.0, 7.0, 10.0)
},
{
    trunk: vec3(2.0, 2.0, 2.0),
    canopy: vec3(8.0, 8.0, 12.0)
},
{
    trunk: vec3(1.5, 1.5, 1.5),
    canopy: vec3(7.0, 7.0, 10.0)
},
{
    trunk: vec3(1.0, 1.0, 1.0),
    canopy: vec3(7.0, 7.0, 7.0)
},
{
    trunk: vec3(1.5, 1.5, 1.5),
    canopy: vec3(7.0, 7.0, 10.0)
},
{
    trunk: vec3(2.0, 2.0, 2.0),
    canopy: vec3(8.0, 8.0, 12.0)
},
{
    trunk: vec3(1.5, 1.5, 1.5),
    canopy: vec3(7.0, 7.0, 10.0)
},
{
    trunk: vec3(1.0, 1.0, 1.0),
    canopy: vec3(7.0, 7.0, 7.0)
},
{
    trunk: vec3(1.5, 1.5, 1.5),
    canopy: vec3(7.0, 7.0, 10.0)
},
{
    trunk: vec3(2.0, 2.0, 2.0),
    canopy: vec3(8.0, 8.0, 12.0)
},
{
    trunk: vec3(1.5, 1.5, 1.5),
    canopy: vec3(7.0, 7.0, 10.0)
},
{
    trunk: vec3(1.0, 1.0, 1.0),
    canopy: vec3(7.0, 7.0, 7.0)
},
{
    trunk: vec3(1.5, 1.5, 1.5),
    canopy: vec3(7.0, 7.0, 10.0)
},
{
    trunk: vec3(2.0, 2.0, 2.0),
    canopy: vec3(8.0, 8.0, 12.0)
}];

var sizeIndicies = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

var greens = [green1, green2, green3, green4, green5, green6, green7, green1, green2, green3, green4, green5, green6, green7, green1];
var greensIndicies = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

var browns = [brown0, brown1, brown2, brown3, brown0, brown1, brown2, brown3, brown0, brown1, brown2, brown3, brown0, brown1, brown2];
var brownsIndicies = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
