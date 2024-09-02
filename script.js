let allAverages = []; // 用于存储所有的平均深度

function TreeNode(state) {
  this.state = state;
  this.left = null;
  this.right = null;
}

function generateTree(node) {
  if (node.state === 1) {
    if (Math.random() < 0.5) {
      node.left = new TreeNode(1);
      generateTree(node.left);
    } else {
      node.left = new TreeNode(0);
    }

    if (Math.random() < 0.5) {
      node.right = new TreeNode(1);
      generateTree(node.right);
    } else {
      node.right = new TreeNode(0);
    }
  }
}

function calculateDepth(node) {
  if (node == null || node.state === 0) {
    return 0;
  }

  const leftDepth = calculateDepth(node.left);
  const rightDepth = calculateDepth(node.right);

  return Math.max(leftDepth, rightDepth) + 1;
}

function simulateTreeGeneration(trials) {
  let totalDepth = 0;

  for (let i = 0; i < trials; i++) {
    const root = new TreeNode(1);
    generateTree(root);
    totalDepth += calculateDepth(root);
  }

  const averageDepth = totalDepth / trials;
  allAverages.push(averageDepth); // 将本次平均深度添加到数组

  let totalAllAverages = 0;
  for (let average of allAverages) {
    totalAllAverages += average;
  }
  const overallAverage = totalAllAverages / allAverages.length; // 计算所有平均深度的平均值
  const times = trials * allAverages.length;

  return {
    averageDepth: averageDepth.toFixed(2),
    times: times,
    overallAverage: overallAverage.toFixed(2)
  };
}

function runSimulation() {
  const trials = document.getElementById('trials').value;
  const { averageDepth, overallAverage, times } = simulateTreeGeneration(trials);

  document.getElementById('result').innerText = "本次平均深度: " + averageDepth;
  document.getElementById('timesCount').innerText = "总共模拟的次数: " + times;
  document.getElementById('allResults').innerText = "所有平均深度的平均值: " + overallAverage;
}
