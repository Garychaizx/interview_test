let normalOrderId = 1;
let vipOrderId = 1;
let botCount = 0;

document.getElementById('newNormalOrderBtn').addEventListener('click', addNormalOrder);
document.getElementById('newVIPOrderBtn').addEventListener('click', addVIPOrder);
document.getElementById('addBotBtn').addEventListener('click', addBot);
document.getElementById('removeBotBtn').addEventListener('click', removeBot);

function addNormalOrder() {
  const order = createOrder('Normal', normalOrderId);
  insertpending(order);
  normalOrderId++;
}

function addVIPOrder() {
  const order = createOrder('VIP', vipOrderId);
  insertAfterLastVip(order);
  vipOrderId++;
}

function insertpending(newOrder){
  const pendingArea = document.getElementById('pendingArea');
  const pendingOrders = Array.from(pendingArea.children);
  pendingArea.insertBefore(newOrder, pendingOrders[pendingArea.length ]);
}

function insertAfterLastVip(newOrder) {
  const pendingArea = document.getElementById('pendingArea');
  const pendingOrders = Array.from(pendingArea.children);
  let lastVipOrderIndex = -1;
  let firstNormalOrderIndex = pendingOrders.length;

  // Find the index of the last existing VIP order
  for (let i = pendingOrders.length - 1; i >= 0; i--) {
    if (pendingOrders[i].classList.contains('vip')) {
      lastVipOrderIndex = i;
      break; // Stop searching once the last VIP order is found
    }
  }

  // Insert the new order after the last existing VIP order
  if (lastVipOrderIndex !== -1) {
    pendingArea.insertBefore(newOrder, pendingOrders[lastVipOrderIndex + 1]);
  } 
  else if(lastVipOrderIndex == -1){
    // If there are no existing VIP orders, simply append the new order
    pendingArea.insertBefore(newOrder, pendingOrders[0]);
  }
}

let stopAddingBot = false; // Flag to indicate whether to stop adding bots

function addBot() {
  botCount++;
  const pendingArea = document.getElementById('pendingArea');
  const completeArea = document.getElementById('completeArea');

  // Check if adding bots should be stopped
  if (stopAddingBot) return;

  // Check if there are pending orders
  if (pendingArea.children.length > 0) {
    const order = pendingArea.children[0]; // Access the first pending order

    // Start the timer immediately
    const timer = setTimeout(() => {
      // Move the order to the completed area after 10 seconds
      completeArea.appendChild(order);
      botCount--;

      // Check if there are more pending orders and adding bots should not be stopped
      if (pendingArea.children.length > 0 && !stopAddingBot) {
        addBot(); // Process next order
      }
    }, 10000); // 10 seconds delay

    // Store the timer to be able to clear it if needed
    order.dataset.timer = timer;
  }
}


function removeBot() {
  if (botCount > 0) {
    botCount--;
    stopAddingBot = true; // Set flag to stop adding bots
  }
}


function createOrder(type, orderId) {
  const order = document.createElement('div');
  order.textContent = `Order ${orderId} - ${type}`;
  order.classList.add(type.toLowerCase()); // Add class for styling
  return order;
}
