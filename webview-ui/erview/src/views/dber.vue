<template>
  <div class="antv-x6">
    <!-- <div class="app-stencil" id="stencilContainer" ref="stencilContainer"></div> -->
    <div class="app-content" ref="containerRef"></div>
    <div class="operating">
      <!-- <ElTooltip class="item" effect="light" content="撤销" placement="bottom">
        <el-icon @click="undoFn"><RefreshLeft :class="{ opacity: !canUndo }"/></el-icon>
      </ElTooltip> -->
      <!-- <ElTooltip class="item" effect="light" content="重做" placement="bottom">
        <el-icon @click="redoFn"><RefreshRight :class="{ opacity: !canRedo }"/></el-icon>
      </ElTooltip> -->
      <ElTooltip class="item" effect="light" content="放大" placement="bottom">
        <el-icon @click="zoomInFn"><ZoomIn/></el-icon>
      </ElTooltip>
      <ElTooltip class="item" effect="light" content="缩小" placement="bottom">
        <el-icon @click="zoomOutFn"><ZoomOut :class="{ opacity: !canZoomOut }"/></el-icon>
      </ElTooltip>
      <ElTooltip class="item" effect="light" content="导出" placement="bottom">
        <el-icon @click="savePicture"><PictureFilled /></el-icon>
      </ElTooltip>
      <!-- <ElTooltip class="item" effect="light" content="重置" placement="bottom">
        <el-icon @click="resetFn"><FullScreen/></el-icon>
      </ElTooltip>
      <ElTooltip class="item" effect="light" content="清除" placement="bottom">
        <el-icon @click="clearFn"><Delete/></el-icon>
      </ElTooltip>
      <span id="sp123">123</span> -->
      <ElPopover
        placement="top-start"
        title="标题"
        width="200"
        trigger="hover"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        <el-button slot="reference">hover 激活</el-button>
      </ElPopover>
    </div>
    <ElTooltip content="xxx" popper-class="tooltip-widget">
      <span style="position: relative; left: -1000px; top: -1000px" />
    </ElTooltip>
    <div ref="minimapContainer" class="app-mini"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import { RefreshLeft, RefreshRight, ZoomIn, ZoomOut, FullScreen, Delete, PictureFilled } from '@element-plus/icons-vue';
import { ElTooltip, ElPopover } from 'element-plus';
import { Graph, Shape, FunctionExt } from '@antv/x6';
import { History } from '@antv/x6-plugin-history';
import { Selection } from '@antv/x6-plugin-selection';
import { MiniMap } from '@antv/x6-plugin-minimap';
import { GridLayout, DagreLayout, CircularLayout, ForceLayout } from '@antv/layout'
import ErJsonFile from './er.json'
import { cloneDeep, random } from 'lodash-es';
import { Scroller } from '@antv/x6-plugin-scroller';
import { Export } from '@antv/x6-plugin-export';
import { provideVSCodeDesignSystem, vsCodeButton } from "@vscode/webview-ui-toolkit";
import { vscode } from "../utilities/vscode";

provideVSCodeDesignSystem().register(vsCodeButton());

const LINE_HEIGHT = 24
const NODE_WIDTH = 160
const defaultTableStyle = {
  id: '',
  label: '',
  ports: [],
  height: 24,
  width: 160,
  shape: 'er-rect',
  position: {
    x: '',
    y: ''
  }
}

const defalitColumnsStyle = {
  id: '',
  group: 'column',
  attrs: {
    columnCode: { text: '' },
    dataType: { text: '' },
    primaryKey: {}
  }
}

defineOptions({
  name: 'ER',
  inheritAttrs: false,
});

const gridLayout = ref<any>({});
const circularLayout = reactive({});
const dagreLayout = reactive({});
const forceLayout = reactive({});

gridLayout.value = new GridLayout({
  type: 'grid',
  // begin: [1, 1], // 开始位置
  // center: [200, 200],
  width: 738,
  height: 360,
  sortBy: 'label',
  preventOverlap: true, // 防止重叠
  rows: 3,
  cols: 7,
  nodeSize: [100, 100]
});
const props = defineProps({
  erList: [],
  jdlFilename: {
    type: String,
    default: ''
  },
})

const ErJson: any[] = [];

if (props.erList && props.erList.length > 0) {
  ErJson.push(...(props.erList as any[]));
} else {
  ErJson.push(...ErJsonFile)
}

const graphRef = ref<any>(null);
const minimapContainer = ref<any>(null);
const data: Ref<any[]> = ref([]);
const selectCell = ref('');
const canRedo = ref(false);
const canUndo = ref(false);
const canZoomOut = ref(true);
const showRight = ref(false);
const containerRef = ref(null);
const nodeId = ref('');

function loadEvents(containerRef: any) {
  // 节点双击
  graphRef.value.on('node:dblclick', ({ node }) => {
    const data = node.store.data;
    const { type, id } = data
    console.log('node:dbclick', node);
    if (type === 'taskNode') {
      nodeId.value = id
      showRight.value = true
    } else {
      nodeId.value = ''
      showRight.value = false
    }
  })
  // 连线双击
  graphRef.value.on('edge:dblclick', ({ edge }) => {
    const data = edge.store.data
    const { type, id } = data
    console.log('edge:dbclick', edge);
    if (type === 'taskNode') {
      nodeId.value = id
      showRight.value = true
    } else {
      nodeId.value = ''
      showRight.value = false
    }
  })
  // 节点鼠标移入
  // graphRef.value.on('node:mouseenter', FunctionExt.debounce(({ node }) => {
  //   // console.log('鼠标移入', node);
  //   // node.attr('body/stroke', 'red')
  //   // 添加删除
  //   node.addTools({
  //     name: 'button-remove',
  //     args: {
  //       x: 0,
  //       y: 0,
  //       offset: { x: 140, y: 10 }
  //     }
  //   })
  // }),
  //   500
  // )
  graphRef.value.on('node:port-contextmenu', ({ e }) => {
    console.log('ports', e, e.currentTarget.parentElement.getAttribute('port'))
  })
  // 连接线鼠标移入
  graphRef.value.on('edge:mouseenter', ({ edge }) => {
    edge.addTools([
      'source-arrowhead',
      'target-arrowhead',
      {
        name: 'button-remove',
        args: {
          distance: '50%'
        }
      }
    ])
  })
  // 节点鼠标移出
  graphRef.value.on('node:mouseleave', ({ node }) => {
    // 移除删除
    node.removeTools()
  })
  graphRef.value.on('edge:mouseleave', ({ edge }) => {
    edge.removeTools()
  })
  graphRef.value.on('edge:connected', ({ isNew, edge }) => {
    console.log('connected', edge.source, edge.target);
    if (isNew) {
      // 对新创建的边进行插入数据库等持久化操作
    }
  })
}

function init() {
  Graph.registerPortLayout(
    'erPortPosition',
    (portsPositionArgs) => {
      return portsPositionArgs.map((_, index) => {
        return {
          position: {
            x: 0,
            y: (index + 1) * LINE_HEIGHT
          },
          angle: 0
        }
      })
    },
    true
  )
  // 节点注册
  Graph.registerNode(
    'er-rect',
    {
      inherit: 'rect',
      markup: [
        {
          tagName: 'rect',
          selector: 'body'
        },
        {
          tagName: 'text',
          selector: 'label'
        }
      ],
      attrs: {
        rect: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#5F95FF'
        },
        label: {
          fontWeight: 'bold',
          fill: '#ffffff',
          fontSize: 12
        }
      },
      ports: {
        groups: {
          column: {
            markup: [
              {
                tagName: 'rect',
                selector: 'portBody'
              },
              {
                tagName: 'text',
                selector: 'columnCode'
              },
              {
                tagName: 'text',
                selector: 'dataType'
              },
              {
                tagName: 'image',
                selector: 'primaryKey'
              },
              {
                tagName: 'text',
                selector: 'comment'
              }
            ],
            attrs: {
              portBody: {
                height: LINE_HEIGHT,
                strokeWidth: 1,
                stroke: '#5F95FF',
                fill: '#EFF4FF',
                magnet: true
              },
              columnCode: {
                ref: 'portBody',
                refX: 6,
                refY: 6,
                fill: '#5F95FF',
                fontSize: 10,
                event: 'node:port-contextmenu'
              },
              dataType: {
                ref: 'portBody',
                refX: 70,
                refY: 6,
                fontSize: 10,
                event: 'node:port-contextmenu'
              },
              primaryKey: {
                ref: 'portBody',
                width: 16,
                height: 16,
                x: 110,
                y: 0,
                event: 'node:port-contextmenu'
              },
              comment: {
                ref: 'portBody',
                width: 16,
                height: 16,
                fontSize: 10,
                refX: 130,
                refY: 6,
                event: 'node:port-contextmenu'
              }
            },
            position: 'erPortPosition'
          }
        }
      }
    },
    true
  )
  const graph = new Graph({
    container: containerRef.value as any,
    autoResize: true,
    background: {
      color: '#ffffff'
    },
    grid: {
      size: 10, // 网格大小 10px
      visible: true, // 绘制网格，默认绘制 dot 类型网格
      type: 'doubleMesh',
      args: [
        {
          color: '#E7E8EA',
          thickness: 1
        },
        {
          color: '#CBCED3',
          thickness: 1,
          factor: 5
        }
      ]
    },
    // 鼠标滚轮的默认行为是滚动页面
    mousewheel: {
      enabled: true,
      modifiers: ['ctrl', 'meta'], // +按键为缩放
      minScale: 0.5,
      maxScale: 2
    },
    // background: '#f5f5f5', // 背景
    connecting: {
      router: {
        name: 'er',
        args: {
          offset: 25,
          direction: 'H'
        }
      },
      snap: true, // 自动吸附
      allowBlank: false, // 是否允许连接到画布空白位置的点
      allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
      allowNode: false, // 是否允许边链接到节点（非节点上的链接桩）
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: '#A2B1C3',
              strokeWidth: 2
            }
          }
        })
      }
    },
    // 高亮
    highlighting: {
      magnetAvailable: {
        name: 'stroke',
        args: {
          padding: 4,
          attrs: {
            strokeWidth: 4,
            stroke: '#6a6c8a'
          }
        }
      }
    },
    // onPortRendered(args) {
    //   const ab = '111'
    //   const selectors = args.contentSelectors;
    //   const container = selectors && selectors.portBody;
    //   console.log('onPortRendered', container, typeof container);
    //   if (container && document.getElementById('sp123')) {
    //     new Vue({
    //       el: '#sp123',
    //       data() {
    //         return {
    //           cot: ab
    //         }
    //       },
    //       created() {
    //         console.log('created', this.cot);
    //       },
    //       render: h => {
    //         return (
    //           <el-tooltip
    //           effect='dark'
    //           content='port'
    //           placement='right'
    //         >
    //           <div
    //             class='my-port'
    //             style='width: 100%;height:100%;border: 1px solid #5F95FF;border-radius: 100%;background: #fff;'
    //           />
    //         </el-tooltip>
    //         );
    //       }
    //     });
    //   }
    // }
    // onPortRendered({ contentContainer, port, node }) {
    // TODO:针对dom操作一个tooltip的位置与内容-----过快的移入移除多次，会导致失效
    // console.log('onPortRendered', port.attrs);
    // contentContainer.addEventListener('mouseenter', (e) => {
    //   const tooltip = document.querySelector('.tooltip-widget');
    //   if (tooltip) {
    //     tooltip.innerHTML = 'this is tooltip'
    //     setTimeout(() => {
    //       tooltip.style.left = `${e.clientX - tooltip.offsetWidth / 2 + 5
    //         }px`;
    //       tooltip.style.top = `${e.clientY}px`;
    //     }, 20);
    //   }
    // });
    // contentContainer.addEventListener('mouseleave', () => {
    //   setTimeout(() => {
    //     const tooltip = document.querySelector('.tooltip-widget');
    //     if (tooltip) {
    //       tooltip.style.left = '-1000px';
    //       tooltip.style.top = '-1000px';
    //     }
    //   }, 30);
    // });
  // }
  });
  // history: true, // 启动历史记录
  graph.use(new History({enabled: true}))
  // 边框选择插件
  // selecting: { // 选择与框选
    // enabled: true,
    //   rubberband: true,
    //   movable: true,
    //   strict: true,
    //   showNodeSelectionBox: true, // 显示节点的选择框（才能进行移动）
    //   modifiers: ['alt']
    // },
  graph.use(new Selection({enabled: true}));
  graph.use(
        new MiniMap({
          container: minimapContainer.value as any,
          scalable: true
        })
      )
  graph.use(
    new Scroller({
      enabled: true,
    }),
  );
  graph.use(new Export());
  // console.log('ErJson', ErJson, typeof ErJson);
  data.value = ErJson as any[];
  const cells: any[] = []
  const nodes: any[] = []
  const edges: any[] = []
  ErJson.forEach((item: any) => {
    if (item.shape === 'edge') {
      cells.push(graph.createEdge(item))
    } else {
      cells.push(graph.createNode(item))
    }
  })
  // graph.fromJSON(gridLayout.value.layout(model));
  graph.resetCells(cells);
  const model = { nodes: cells, edges: edges};
  // console.log('cells', cells);

  // graph.resetCells(cells)
  const modelData = gridLayout.value.layout(model);
  const c = [...modelData.edges, ...modelData.nodes];
  c.forEach((item) => {
    if (item.shape === "edge") {
      cells.push(graph.createEdge(item));
    } else {
      cells.push(graph.createNode(item));
    }
  });
  graph.zoomToFit({ padding: 10, maxScale: 1 });
  graphRef.value = graph as Graph;
  // 清除 history 版本
  // this.graph.history.redo()
  // this.graph.history.undo()
  // 监听历史版本
  // this.graph.history.on('change', () => {
  //   this.canRedo = this.graph.history.canRedo()
  //   this.canUndo = this.graph.history.canUndo()
  // })
  loadEvents(containerRef)
}

function addTable() {
  const nodes = []
  for (let index = 0; index < 1500; index++) {
    const table = { id: `t${index}`, label: `test${index}` }
    const node: any = Object.assign(cloneDeep(defaultTableStyle), table)
    // console.log('for-',index, node)
    node.position.x = random(0, index*10)
    node.position.y = random(0, index*10)

    const columns = [{ id: `t${index}`+'c1', columnCode: `t${index}`+'id', dataType: 'int', primaryKey: true }, { id: `t${index}`+'c2', columnCode: `t${index}`+'name', dataType: 'varchar', primaryKey: false }]

    columns.forEach(e => {
      const item = cloneDeep(defalitColumnsStyle)
      item.id = e.id
      item.attrs.columnCode.text = e.columnCode
      item.attrs.dataType.text = e.dataType
      item.attrs.primaryKey['xlink:href'] = e.primaryKey ? 'https://antv-x6.gitee.io/icons/icon-144x144.png' : ''
      node.ports.push(item)
    });
    nodes.push(node)
  }
  console.log('nodes', nodes)
  graphRef.value.addNodes(nodes)
}

// 放大
function zoomInFn() {
  graphRef.value.zoom(0.1)
  canZoomOut.value = true
}

// 缩小
function zoomOutFn() {
  if (!canZoomOut.value) return
  const Num = Number(graphRef.value.zoom().toFixed(1))

  if (Num > 0.1) {
    graphRef.value.zoom(-0.1)
  } else {
    canZoomOut.value = false
  }
}

// 保存图片
function savePicture() {
  graphRef.value.toPNG((dataUri: string) => {
    console.log('toPNG.dataUri', dataUri);
    vscode.postMessage({
      command: "jdl.jdl2png",
      text: dataUri,
    });
  }, { preserveDimensions: true, quality: 1 });
}

// 重做
function redoFn() {
  if (!canRedo.value) return
  graphRef.value.history.redo()
}
// 撤消
function undoFn() {
  if (!canUndo.value) return
  graphRef.value.history.undo()
}
// 重置
function resetFn() {
  graphRef.value.centerContent()
  graphRef.value.zoom(0)
}
// 清除
function clearFn() {
  graphRef.value.clearCells()
}
onMounted(() => {
  init();
  // addTable();
});
</script>


<style lang="scss" scoped>
.antv-x6 {
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  .node-c {
    width: 200px;
    border-right: 1px solid #eee;
    padding: 20px;
    dl {
      margin-bottom: 20px;
      line-height: 30px;
      display: flex;
      cursor: move;
      dt {
        &.circle {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          &.start {
            border: 1px solid green;
            background: greenyellow;
          }
          &.end {
            border: 1px solid salmon;
            background: red;
          }
        }
        &.rect {
          width: 30px;
          height: 30px;
          border: 1px solid #ccc;
        }
      }
      dd {
        font-size: bold;
        font-size: 14px;
        padding: 0 0 0 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .template-c {
    padding: 10px 0;
    li {
      line-height: 40px;
      font-size: 14px;
      border-bottom: 1px solid #dcdfe6;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      span {
        flex: 1;
        padding-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      i {
        font-size: 14px;
        color: #2d8cf0;
        width: 20px;
        line-height: 40px;
      }
    }
  }
  .container {
    flex: 1;
  }
  .operating {
    position: fixed;
    top: 0;
    left: 241px;
    z-index: 999;
    background-color: #ffffff;
    padding: 10px;
    box-shadow: 1px 1px 4px 0 #0a0a0a2e;
    i {
      font-size: 24px;
      cursor: pointer;
      margin: 0 10px;
      color: #515a6e;
      &:hover {
        color: #2d8cf0;
      }
      &.opacity {
        opacity: 0.5;
      }
    }
  }
}
.content {
  font-family: sans-serif;
  display: flex;
}

.app-stencil {
  width: 250px;
  border: 1px solid #f0f0f0;
  position: relative;
}

.app-content {
  flex: 1;
  height: 100vh;
  margin-left: 8px;
  margin-right: 8px;
  box-shadow: 0 0 10px 1px #e9e9e9;
}

.app-mini {
  position: fixed;
  z-index: 999;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.x6-graph-scroller {
  border: 1px solid #f0f0f0;
  margin-left: -1px;
}
</style>
