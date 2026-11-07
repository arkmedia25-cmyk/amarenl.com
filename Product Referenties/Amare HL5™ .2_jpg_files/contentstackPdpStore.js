// pdp contentstack vue reactive store
define(["vue"], function (Vue) {
    var bus = new Vue();

    var state = {
        contentstackFilterValue: ""
    };

    return {
        state: state,
        bus: bus
    }
});