const ClickOutside = {
    bind: (el, binding, vnode) => {
        el.__ClickOutsideHandler__ = (event) => {
            if (!(el === event.target || el.contains(event.target))) {
                if (typeof binding.value === 'function') {
                    binding.value(event);
                }
            }
        };

        document.addEventListener('click', el.__ClickOutsideHandler__);
    },
    unbind: (el) => {
        document.removeEventListener('click', el.__ClickOutsideHandler__);
        delete el.__ClickOutsideHandler__;
    }
};
