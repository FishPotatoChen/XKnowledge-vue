<template>
  <a-space wrap>
    <a-button type="primary" @click="showCharts(analysisMode)">Primary Button</a-button>
  </a-space>
  <div id="container" style="height: 100%"></div>
</template>


<script setup>

import {onMounted, ref} from "vue";
import * as echarts from "echarts";
// import myAxios from "@/plugins/myAxios.ts";


// const jsonData = await myAxios.get('http://localhost:8080/test.json');
//
// console.log(jsonData)

const analysisModeList = {
  "type": "force",
  "categories": [
    {
      "name": "HTMLElement",
      "keyword": {},
      "base": "HTMLElement"
    },
    {
      "name": "WebGL",
      "keyword": {},
      "base": "WebGLRenderingContext"
    },
    {
      "name": "SVG",
      "keyword": {},
      "base": "SVGElement"
    },
    {
      "name": "CSS",
      "keyword": {},
      "base": "CSSRule"
    },
    {
      "name": "Other",
      "keyword": {}
    }
  ],
  "nodes": [
    {
      "name": "AnalyserNode",
      "des": "nodedes01",
      "value": 1,
      "symbolSize": 50,
      "category": 4
    },
    {
      "name": "CSSValue",
      "value": 1,
      "symbolSize": 50,
      "category": 3
    },
    {
      "name": "HTMLElement",
      "value": 3,
      "symbolSize": 50,
      "category": 0
    },
    {
      "name": "SVGCursorElement",
      "value": 1,
      "symbolSize": 50,
      "category": 2
    },
    {
      "name": "WebGLContextAttributes",
      "value": 1,
      "symbolSize": 50,
      "category": 1
    }
  ],
  "links": [
    {
      "name": "link01",
      "source": 0,
      "target": 1
    },
    {
      "name": "link02",
      "source": 0,
      "target": 2
    },
    {
      "name": "link03",
      "source": 0,
      "target": 3
    },
    {
      "name": "link04",
      "source": 4,
      "target": 2
    },
    {
      "name": "link05",
      "source": 5,
      "target": 4
    }
  ]
}

const analysisMode = ref(analysisModeList)


onMounted(() => {
  showCharts(analysisMode)
})


const showCharts = (analysisMode) => {
  const jsonData = analysisMode.value
  console.log(jsonData)
  // 基于准备好的dom，初始化echarts实例
  let chartDom = document.getElementById("container");
  // chartDom.showLoading(); // 加载等待
  if (!chartDom) {
    console.error("container 图表容器不存在，请检查HTML代码！");
  } else {
    // 初始化 ECharts 图表
    const myChart = echarts.init(chartDom);
    if (!jsonData) {
      console.error("图表信息为空，请联系管理员！");
    } else {
      const option = {
        // 图的标题
        title: {
          text:  jsonData.title ? jsonData.title : "新建知识图谱"
        },
        // 提示框的配置
        tooltip: {
          formatter: function (x) {
            return x.data.des;
          }
        },
        // 工具箱
        toolbox: {
          // 显示工具箱
          show: true,
          feature: {
            mark: {
              show: true
            },
            // 还原
            restore: {
              show: true
            },
            // 保存为图片
            saveAsImage: {
              show: true
            }
          }
        },
        legend: {
          data: jsonData.categories.map(function (a) {
            return a.name;
          })
        },
        series: [
          {
            type: "graph", // 类型:关系图
            layout: "force", //图的布局，类型为力导图
            //symbolSize: 40, // 调整节点的大小
            roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 "scale" 或者 "move"。设置成 true 为都开启
            // edgeSymbol: ["circle", "arrow"],
            //edgeSymbolSize: [2, 10],
            //edgeLabel: {
            //    normal: {
            //        textStyle: {
            //            fontSize: 20
            //        }
            //    }
            //},
            force: {
              edgeLength: [10, 50],
              repulsion: 2500,
              gravity: 0.2
            },
            //draggable: true, // 元素是否可以被拖动
            // 边的风格
            lineStyle: {
              normal: {
                width: 2,
                color: "#4b565b",
              }
            },
            // 边上显示当前边的名称
            edgeLabel: {
              normal: {
                show: true,
                formatter: function (x) {
                  return x.data.name;
                }
              }
            },
            // 节点上显示当前节点名称
            label: {
              normal: {
                show: true,
                textStyle: {}
              },
              position: 'right',
              formatter: '{b}'
            },
            // 高亮时节点外层增加黑色边缘
            emphasis: {
              disable: true,
              itemStyle: {
                borderColor: "#000",
                borderWidth: 2,
                borderType: "solid"
              }
            },
            animation: false,
            // 数据
            data: jsonData.nodes.map(function (node, idx) {
              node.id = idx;
              return node;
            }),
            edges: jsonData.links,
            categories: jsonData.categories,
          }
        ]
      };
      // myChart.hideLoading();// 隐藏加载等待
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

      // option && myChart.setOption(option);
    }
  }
}

</script>


<style scoped>

</style>