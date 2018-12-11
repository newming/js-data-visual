class Node {
    constructor(name) {
        this.name = name
        this.parent = null
        this.children = []
    }

    addChild(node) {
        node.parent = this
        this.children.push(node)

        return this
    }

    siblings() {
        const self = this

        if (this.parent) {
            return this.parent.children.filter(function (node) {
                return node !== self
            })
        } else {
            return []
        }
    }

    get degree() {
        return this.children.length
    }

    getDepthByRoot(root) {
        let depth = 0
        let currNode = this

        while (currNode.parent !== root) {
            depth++
            currNode = currNode.parent
        }

        return depth + 1
    }

    get depth() {
        return this.getDepthByRoot(null)
    }
    // BFS(Breadth-first Search 广度优先算法)
    get height() {
        const queue = [this]
        let deepestNode = this

        while (queue.length > 0) {
            const len = queue.length

            for (let i = 0; i < len; ++i) {
                const currNode = queue.shift()

                deepestNode = currNode

                if (currNode.children.length > 0) {
                    queue.push(...currNode.children)
                }
            }
        }

        return deepestNode.getDepthByRoot(this)
    }
    // 重要
    toString(join = true) {
        let parts = [this.name]

        if (this.children.length > 0) {
            parts = parts.concat(this.children
                .map(function (node) {
                    // map 里执行递归操作，调用一个字节点的 toString() 方法，每一个子节点返回一个数组 []，最终 map 返回 [[], [], ...]
                    return node.toString(false)
                })
                .reduce(function (left, right) {
                    // 将上边 map 返回的同一级的子节点合并为一个数组
                    return left.concat(right)
                })
                .map(function (line) {
                    // 缩进
                    return '  ' + line
                })
            )
        }

        if (join) {
            // 只有第一级执行 join 转字符串，其余级都是返回数组(第一级最后执行，其余级越深的执行到这里越早，在 if 中有递归)
            return parts.join('\n')
        } else {
            return parts
        }
    }
}
// 树
class Tree {

    constructor(root) {
        this.root = root
    }

    addNode(node, parent = this.root) {
        parent.addChild(node)
    }
    // DFS(Depth-first Search) 深度优先搜索
    search(validator) {
        const queue = [this.root]
        const result = [] // 注意这里的搜索结果，可能是多个

        while (queue.length > 0) {
            const currNode = queue.shift()

            if (validator(currNode)) {
                result.push(currNode)
                continue
            }

            if (currNode.children.length > 0) {
                queue.unshift(...currNode.children)
            }
        }

        return result
    }
    // DFS
    get size() {
        let size = 0
        const bag = [this.root]

        while (bag.length > 0) {
            const currNode = bag.shift()

            size++

            if (currNode.children.length > 0) {
                bag.unshift(...currNode.children)
            }
        }

        return size
    }
    // size BFS
    get sizeBFS() {
        let size = 0
        const bag = [this.root]

        while (bag.length > 0) {
            const currNode = bag.shift()

            size++

            if (currNode.children.length > 0) {
                bag.push(...currNode.children)
            }
        }

        return size
    }
    get height() {
        return this.root.height
    }
}