import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js"

const firebaseConfig = {
  apiKey: "AIzaSyDRHTl7hx5umlfi2HFnXt2kCDbNZPCw4iI",
  authDomain: "happiness-f3909.firebaseapp.com",
  projectId: "happiness-f3909",
  storageBucket: "happiness-f3909.appspot.com",
  messagingSenderId: "833703649555",
  appId: "1:833703649555:web:c56123255b7bb49e023ae6",
  databaseURL: "https://happiness-f3909-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const resultRef = ref(database, 'average/state');
const cityRef = ref(database, 'average/school');
var myChart = null;

// Color palettes
const colorThemes = {
  vibrant: ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93", "#F15BB5", "#00BBF9", "#00F5D4", "#FE5E41", "#9C89B8", "#F0A6CA", "#EFC3E6", "#B9FAF8", "#C9E4DE", "#FDFFB6", "#CAFFBF", "#9BF6FF", "#A0C4FF", "#FFADAD", "#FFD6A5"],
  pastel: ["#FFCDB2", "#FFB4A2", "#E5989B", "#B5838D", "#6D6875", "#FDC5F5", "#F7A6F5", "#F587F5", "#E172E8", "#B15FCC", "#A8D5BA", "#89C2D9", "#61A5C2", "#468FAF", "#2C7DA0", "#FDFFB6", "#CAFFBF", "#9BF6FF", "#A0C4FF", "#FFD6A5"],
  mono: ["#F8F9FA", "#E9ECEF", "#DEE2E6", "#CED4DA", "#ADB5BD", "#6C757D", "#495057", "#343A40", "#212529", "#000000"],
  warm: ["#FF9F1C", "#FFBF69", "#F94144", "#F3722C", "#F8961E", "#F9C74F", "#90BE6D", "#43AA8B", "#4D908E", "#577590"],
  cool: ["#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8", "#03045E", "#023E8A", "#0096C7", "#48CAE4", "#ADE8F4", "#CAF0F8"]
};

// Initialize the page
function initPage() {
  // Initialize dropdowns
  const selectData = $("#select-data");
  selectData.append(`<option value="score">Average Score</option>`);
  selectData.append(`<option value="users">User Count</option>`);
  selectData.append(`<option value="city">City Data</option>`);

  const selectChart = $("#select-chart");
  selectChart.append(`<option value="bar">Bar Chart</option>`);
  selectChart.append(`<option value="line">Line Chart</option>`);
  selectChart.append(`<option value="pie">Pie Chart</option>`);

  // Add animations to elements
  $(".insights-header").addClass("fade-in");
  $(".notification").addClass("slide-in");
  
  // Set default selections
  $("#select-data").val("score");
  $("#select-chart").val("bar");
  representData("score", "bar", "vibrant");
}

// To detect change in data dropdown
$(document).on("change", "#select-data, #select-chart, #select-theme", function() {
  const optionData = $("#select-data").find("option:selected");
  const optionChart = $("#select-chart").find("option:selected");
  const optionTheme = $("#select-theme").find("option:selected");
  const isDefault = optionData.attr("data-default") !== undefined;

  if (isDefault) {
    return;
  }

  const data = optionData.val();
  const chart = optionChart.val();
  const theme = optionTheme.val();
  representData(data, chart, theme);
});

// Download chart functionality
$(document).on("click", "#download-chart", function() {
  if (myChart) {
    const downloadLink = document.createElement('a');
    downloadLink.href = myChart.toBase64Image();
    downloadLink.download = 'happiness-chart.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Add feedback animation
    $(this).addClass('is-loading');
    setTimeout(() => {
      $(this).removeClass('is-loading');
    }, 1000);
  }
});

function createChart(xValues, yValues, colors, type) {
  if(myChart){
    myChart.destroy();
  }
  
  // Add animation to chart container
  $(".chart-container").addClass("pulse");
  setTimeout(() => {
    $(".chart-container").removeClass("pulse");
  }, 500);
  
  // Update chart info
  updateChartInfo(xValues, yValues);
  
  myChart = new Chart("myChart", {
    type: type,
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: colors,
        data: yValues,
        borderColor: type === 'line' ? '#48c78e' : '',
        borderWidth: type === 'line' ? 3 : 0,
        hoverBackgroundColor: colors.map(color => color + 'DD'),
        hoverBorderColor: '#000',
        hoverBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      title: {
        display: true,
        text: "Happiness Report",
        fontSize: 18,
        fontColor: '#363636',
        fontStyle: 'bold'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: '#4a4a4a'
          },
          gridLines: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: '#4a4a4a'
          },
          gridLines: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        }]
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      },
      tooltips: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFontSize: 14,
        bodyFontSize: 14,
        cornerRadius: 4,
        callbacks: {
          label: function(tooltipItem, data) {
            return data.labels[tooltipItem.index] + ': ' + tooltipItem.yLabel;
          }
        }
      }
    }
  });
}

function updateChartInfo(labels, values) {
  if (values && values.length > 0) {
    $(".chart-info").removeClass("is-hidden");
    
    $("#data-points").text("Data Points: " + values.length);
    $("#highest-value").text("Highest: " + Math.max(...values).toFixed(2));
    $("#lowest-value").text("Lowest: " + Math.min(...values).toFixed(2));
    
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = (sum / values.length) || 0;
    $("#average-value").text("Average: " + avg.toFixed(2));
    
    // Add animation to tags
    $(".tag").addClass("tag-fade-in");
  } else {
    $(".chart-info").addClass("is-hidden");
  }
}

function representData(data, ChartType, theme = 'vibrant') {
  const colors = colorThemes[theme] || colorThemes.vibrant;

  switch (data) {
    case 'score':
      get(resultRef).then((snap) => {
        const average = snap.val();
        const score = Object.values(average);
        const averageScore = score.map(function (item) { return item["averageScore"]; });

        createChart(Object.keys(average), score.map(function (item) { return item["averageScore"]; }), colors, ChartType);
      });
      break;
    case 'users':
      get(resultRef).then((snap) => {
        const average = snap.val();
        const score = Object.values(average);
        const averageScore = score.map(function (item) { return item[""]; });

        createChart(Object.keys(average), score.map(function (item) { return item["totalUsers"]; }), colors, ChartType);
      });
      break;
    case 'city':
      get(cityRef).then((snap) => {
        const average = snap.val();
        const score = Object.values(average);
        const averageScore = score.map(function (item) { return item["averageScore"]; });

        createChart(Object.keys(average), score.map(function (item) { return item["averageScore"]; }), colors, ChartType);
      });
      break;
  }
}

// Initialize when document is ready
$(document).ready(function() {
  initPage();
});