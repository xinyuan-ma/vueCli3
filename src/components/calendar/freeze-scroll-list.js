


function isObject(variable) {
    // 这个才是真正实现，只是暂时先不改
    // return variable !== null && typeof variable === 'object';
    return isType(variable, 'Object');
}

function isArray(variable) {
    return isType(variable, 'Array');
}

function isType(variable, type) {
    return Object.prototype.toString.call(variable) === `[object ${type}]`;
}
export default {
    props: {
        tag: {
            type: String,
            default() {
                return 'div';
            }
        },
        freeze: {
            type: String,
            default() {
                return 'freeze';
            }
        },
        height: {
            type: String,
            default() {
                return '100%';
            }
        },
        position: {
            type: String,
            default() {
                return 'relative';
            }
        },
        freezeShow: {
            type: Boolean,
            default() {
                return true;
            }
        }
    },
    freezeList: [],
    translateY: '-999',
    freezeNode: null,
    oldScrollTop: 0,
    methods: {
        scroll(e) {
            let el = e.srcElement || e.target;
            if (el.scrollTop < 0 || (this.$options.offsetList && el.scrollTop < this.$options.offsetList[0].top)) {
                if (this.$options.translateY !== '-999') {
                    this.$options.translateY = '-999';
                    this.$forceUpdate();
                }
                return;
            }
            // 冻结节点高度
            let freezeNodeHeight = this.$options.freezeNode.elm.offsetHeight;
            // 容器滚动位置
            let scrollTop = el.scrollTop;
            // 节点到容器顶部距离
            this.$options.offsetList = this.$options.freezeList.map(freeze => {
                return {
                    top: freeze.elm.offsetTop,
                    height: freeze.elm.offsetHeight
                };
            });
            this.$options.offsetList.push({
                top: el.scrollHeight
            });
            let offsetList = this.$options.offsetList;
            // 开始冻结节点坐标
            let freezePoint = freezeNodeHeight + scrollTop;

            this.setFreeze(offsetList, freezePoint, scrollTop - this.$options.oldScrollTop);
            this.$options.oldScrollTop = scrollTop;
        },
        setFreeze(offsetList, freezePoint, detla) {
            for (let i = 0, len = offsetList.length - 1; i < len; i++) {
                let curOffset = offsetList[i];
                let nextOffset = offsetList[i + 1];
                if (freezePoint >= curOffset.top && freezePoint < nextOffset.top) {
                    if (freezePoint < curOffset.top + curOffset.height) {
                        this.$options.translateY = curOffset.top - freezePoint;
                        if (detla) {
                            this.$options.freezeNode = this.$options.freezeList[i - 1 < 0 ? 0 : i - 1];
                        }
                    } else {
                        this.$options.freezeNode = this.$options.freezeList[i];
                        this.$options.translateY = 0;
                    }
                    this.$forceUpdate();
                    break;
                }
            }
        },
        filter(slots) {
            if (!slots) {
                slots = [];
                this.$options.freezeNode = null;
                this.$options.translateY = 0;
            }
            let pattern = new RegExp(this.freeze);
            this.$options.freezeList = slots.filter(slot => {
                let data = slot.data || {};
                let className = '';
                if (isArray(data.class || '')) {
                    className = data.class.join(' ');
                }
                if (isObject(data.class || '')) {
                    Object.keys(key => {
                        className += data.class[key] ? data.class[key] + ' ' : '';
                    });
                }
                return pattern.test((data.staticClass || '') + ' ' + className);
            });
            this.$options.freezeNode = this.$options.freezeNode || (this.$options.freezeList.length > 0 ? this.$options.freezeList[0] : null);
        }
    },
    render(h) {
        this.filter(this.$slots.default);
        // let slots = [].concat(this.$slots.default || []);
        let freezeNode = this.$options.freezeNode;
        let children = [];
        this.$options.offsetList = null;
        if (freezeNode && this.freezeShow) {
            children.push(h(freezeNode.tag, {
                class: freezeNode.data.class || [],
                staticClass: freezeNode.data.staticClass || '',
                style: {
                    'position': 'absolute',
                    'top': 0,
                    'left': 0,
                    'right': 0,
                    'z-index': 1,
                    'transform': 'translate3d(0, ' + this.$options.translateY + 'px, 0)'
                }
            }, cloneVNode(freezeNode.children)));
        }
        children.push(h(this.tag, {
            class: ['scrollbar'],
            style: {
                'height': '100%',
                'overflow-y': 'auto',
                '-webkit-overflow-scrolling': 'touch',
                'transform': 'translate3d(0,0,0)'
            },
            on: {
                '&scroll': this.scroll
            }
        }, this.$slots.default));
        return h('div', {
            style: {
                'height': this.height,
                'position': this.position
            }
        }, children);
    }
};

function cloneVNode(VNode) {
    if (isObject(VNode)) {
        return Object.assign({}, VNode, {
            children: cloneVNode(VNode.children)
        });
    }
    if (isArray(VNode)) {
        return VNode.map(node => {
            return cloneVNode(node);
        });
    }
    return null;
}
