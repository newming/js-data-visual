/**
 * 无向图
 */

// 顶点
class Vertex {
    constructor(id, property) {
        this.id = id
        this.property = property
    }
}
// 定义边
class Edge {
    constructor(leftId, rightId, property) {
        this.leftId = leftId
        this.rightId = rightId
        this.property = property
    }
}

let vertexId = 0
// 实例化顶点，业界通常会使用如 UUID（Universally Unique Identifier，通用唯一识别码）、数据库自增键值等方式，这里简单的使用了自增
function newVertex(property) {
    return new Vertex(++vertexId, property)
}

// 定义 无向图
class Graph {
    constructor(vertices, edges) {

        // Vertices
        this.vertexIds = []
        this.vertices = {}

        for (let i = 0; i < vertices.length; ++i) {
            const vertex = vertices[i]

            this.vertexIds.push(vertex.id)
            this.vertices[vertex.id] = vertex
        }

        const edgesWithId = edges.map(function (edge, i) {
            edge.id = i + 1
            return edge
        })

        // Edges
        this.edgeIds = []
        this.edges = {}
        this.edgeRelations = {}

        for (let i = 0; i < edgesWithId.length; ++i) {
            const edge = edgesWithId[i]

            this.edgeIds.push(edge.id)
            this.edges[edge.id] = edge

            if (typeof this.edgeRelations[edge.leftId] === 'undefined') {
                this.edgeRelations[edge.leftId] = []
            }

            if (typeof this.edgeRelations[edge.rightId] === 'undefined') {
                this.edgeRelations[edge.rightId] = []
            }

            this.edgeRelations[edge.leftId].push(edge.id)
            this.edgeRelations[edge.rightId].push(edge.id)
        }

    }
    // 根据 顶点ID 获取某个顶点
    getVertex(vertexId) {
        if (!_.includes(this.vertexIds, vertexId)) {
            return null
        }

        return this.vertices[vertexId]
    }
    // 遍历 顶点
    eachVertices(callbackFunc) {
        const self = this

        return self.vertexIds.forEach(function (vertexId) {
            return callbackFunc(self.vertices[vertexId])
        })
    }
    // 遍历边
    eachEdges(callbackFunc) {
        const self = this

        return self.edgeIds.forEach(function (edgeId) {
            return callbackFunc(self.edges[edgeId])
        })
    }
    // 根据 顶点ID 获取该顶点的 相邻边数组
    getEdgesByVertexId(vertexId) {
        if (!_.includes(this.vertexIds, vertexId)) {
            return []
        }

        if (!_.has(this.edgeRelations, vertexId)) {
            return []
        }

        const self = this

        return self.edgeRelations[vertexId].map(function (edgeId) {
            return self.edges[edgeId]
        })
    }
    // 顶点的 度(Degree, 相邻边数量)
    degree(vertexId) {
        return this.getEdgesByVertexId(vertexId).length
    }
    // 最大的 度 的顶点
    largestVertex() {
        const self = this

        const degrees = self.vertexIds.map(function (vertexId) {
            return {
                degree: self.degree(vertexId),
                id: vertexId
            }

        })

        return self.getVertex(_.maxBy(degrees, 'degree').id)
    }
    // 最大的 度 的顶点的度
    maxDegree() {
        return this.degree(this.largestVertex().id)
    }
    // 平均度（Average Degree） 每个 edge(边) 实际代表了两个度，因为是相互的
    avgDegree() {
        return 2 * this.edgeIds.length / this.vertexIds.length
    }
    // 自环（Self-Loop）
    loops() {
        const self = this

        return self.edgeIds
            .map(function (edgeId) {
                return self.edges[edgeId]
            })
            .filter(function (edge) {
                return edge.leftId === edge.rightId
            })
    }
}