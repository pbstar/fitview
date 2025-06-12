const chart1 = echarts.init(document.getElementById("chart1"));
const chart2 = echarts.init(document.getElementById("chart2"));
const chart3 = echarts.init(document.getElementById("chart3"));
const chart4 = echarts.init(document.getElementById("chart4"));
chart1.setOption({
  title: {
    text: "数据统计",
    left: "center",
    top: "30px",
    textStyle: { color: "#ffffff" },
  },
  grid: {
    top: "80px",
    left: "40px",
    right: "60px",
    bottom: "40px",
    containLabel: true,
  },
  tooltip: {},
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisLine: { lineStyle: { color: "#ffffff" } },
    axisLabel: { color: "#ffffff" },
  },
  yAxis: {
    type: "value",
    axisLine: { lineStyle: { color: "#ffffff" } },
    axisLabel: { color: "#ffffff" },
    splitLine: { lineStyle: { color: "rgba(255, 255, 255, 0.2)" } },
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
      itemStyle: { color: "#00e5ff" },
      label: { show: true, position: "top", color: "#ffffff" },
    },
  ],
});

// 初始化右上折线图
chart2.setOption({
  grid: {
    top: "80px",
    left: "40px",
    right: "60px",
    bottom: "40px",
    containLabel: true,
  },
  title: {
    text: "趋势分析",
    left: "center",
    top: "30px",
    textStyle: { color: "#ffffff" },
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisLine: { lineStyle: { color: "#ffffff" } },
    axisLabel: { color: "#ffffff" },
  },
  yAxis: {
    type: "value",
    axisLine: { lineStyle: { color: "#ffffff" } },
    axisLabel: { color: "#ffffff" },
    splitLine: { lineStyle: { color: "rgba(255, 255, 255, 0.2)" } },
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      smooth: true,
      lineStyle: { width: 3, color: "#00e5ff" },
      itemStyle: { color: "#ffffff" },
      areaStyle: { color: "rgba(0, 229, 255, 0.3)" },
    },
  ],
});

// 初始化右下饼图
chart3.setOption({
  grid: {
    top: "20px",
    left: "40px",
    right: "60px",
    bottom: "300px",
    containLabel: true,
  },
  title: {
    text: "占比分析",
    left: "center",
    top: "30px",
    textStyle: { color: "#ffffff" },
  },
  tooltip: {
    trigger: "item",
    textStyle: { color: "#333333" },
  },
  legend: {
    orient: "vertical",
    right: "center",
    bottom: "30px",
    textStyle: { color: "#ffffff" },
  },
  series: [
    {
      type: "pie",
      radius: "50%",
      data: [
        {
          value: 1048,
          name: "Search Engine",
          itemStyle: { color: "#00e5ff" },
        },
        { value: 735, name: "Direct", itemStyle: { color: "#00b4ff" } },
        { value: 580, name: "Email", itemStyle: { color: "#0082ff" } },
        {
          value: 484,
          name: "Union Ads",
          itemStyle: { color: "#0055ff" },
        },
        {
          value: 300,
          name: "Video Ads",
          itemStyle: { color: "#002bff" },
        },
      ],
      label: { color: "#ffffff" },
      labelLine: { lineStyle: { color: "rgba(255, 255, 255, 0.3)" } },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});

// 初始化底部表格区域
chart4.setOption({
  title: {
    text: "详细数据",
    left: "center",
    top: "30px",
    textStyle: { color: "#ffffff" },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    textStyle: { color: "#333333" },
  },
  grid: {
    top: "80px",
    left: "40px",
    right: "60px",
    bottom: "40px",
    containLabel: true,
  },
  xAxis: {
    type: "value",
    boundaryGap: [0, 0.01],
    axisLine: { lineStyle: { color: "#ffffff" } },
    axisLabel: { color: "#ffffff" },
    splitLine: { lineStyle: { color: "rgba(255, 255, 255, 0.2)" } },
  },
  yAxis: {
    type: "category",
    data: ["Brazil", "Indonesia", "USA", "India", "China"],
    axisLine: { lineStyle: { color: "#ffffff" } },
    axisLabel: { color: "#ffffff" },
    splitLine: { lineStyle: { color: "rgba(255, 255, 255, 0.2)" } },
  },
  series: [
    {
      type: "bar",
      data: [18203, 23489, 29034, 104970, 131744],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: "#00e5ff" },
          { offset: 1, color: "#0082ff" },
        ]),
      },
      label: { show: true, position: "right", color: "#ffffff" },
    },
  ],
});
