
let acceptedCount = 0;
let rejectedCount = 0;

function updateApprovalCounts() {
  document.getElementById('accepted-count').textContent = acceptedCount;
  document.getElementById('rejected-count').textContent = rejectedCount;
}

// Function to handle acceptance
function handleAcceptance() {
  acceptedCount++;
  updateApprovalCounts();
}

// Function to handle rejection
function handleRejection() {
  rejectedCount++;
  updateApprovalCounts();
}

//Get's the Notification style element and call's the notification-success-box used to show it on screen by timeout 
function showNotificationSuccess(message) {
  const notificationBox = document.createElement('div');
  notificationBox.classList.add('notification-success-box');
  notificationBox.textContent = message;

  document.body.appendChild(notificationBox);
  handleAcceptance();
  setTimeout(() => {
    document.body.removeChild(notificationBox);
  }, 5000);
}
//Get's the Notification style element and call's the notification-reject-box used to show it on screen by timeout
function showNotificationReject(message) {
  const notificationBox = document.createElement('div');
  notificationBox.classList.add('notification-reject-box');
  notificationBox.textContent = message;

  document.body.appendChild(notificationBox);

  setTimeout(() => {
    document.body.removeChild(notificationBox);
  }, 5000);
}
//Removes the .card element by confirmation
function removeCard(button) {
  const card = button.closest('.card');
  if (card) {
    card.remove();
  }
}
//Reject Confirmation
function confirmReject(button) {
  const isConfirmed = window.confirm('Are you sure you want to reject this Estate?');
  if (isConfirmed) {
    removeCard(button);
    showNotificationReject('Estate has been rejected.');
    handleRejection();
  }
}