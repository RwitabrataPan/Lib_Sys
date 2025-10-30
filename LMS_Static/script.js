// Sample data for demonstration
const books = [
	{ id: 1, title: "Introduction to Programming", author: "John Doe", subject: "Computer Science", copies: 5, available: 3 },
	{ id: 2, title: "Database Systems", author: "Jane Smith", subject: "Computer Science", copies: 3, available: 1 },
	{ id: 3, title: "Calculus I", author: "Robert Johnson", subject: "Mathematics", copies: 7, available: 5 },
	{ id: 4, title: "Organic Chemistry", author: "Emily Williams", subject: "Chemistry", copies: 4, available: 2 },
	{ id: 5, title: "World History", author: "Michael Brown", subject: "History", copies: 6, available: 4 }
];

const users = [
	{ id: 1, username: "Akash Roy", password: "pass123", role: "student", name: "Akash Roy", email: "akash@university.edu" },
	{ id: 2, username: "librarian1", password: "pass123", role: "librarian", name: "Sounil M", email: "sounil@university.edu" },
	{ id: 3, username: "manager1", password: "pass123", role: "manager", name: "Rwita Pan", email: "sego@university.edu" },
	{ id: 4, username: "stock1", password: "pass123", role: "stock_manager", name: "Soham Saha", email: "soham@university.edu" },
	{ id: 5, username: "accountant1", password: "pass123", role: "accountant", name: "Eva Davis", email: "eva@university.edu" },
	{ id: 6, username: "Sounil Mukhopaddhay", password: "pass123", role: "student", name: "Sounil Mukhopaddhay", email: "sounil@university.edu" },
	{ id: 7, username: "Rwita Pan ", password: "pass123", role: "student", name: "Rwita Pan", email: "sego@university.edu" },
	{ id: 8, username: "Soham Saha", password: "pass123", role: "student", name: "Soham Saha", email: "soham@university.edu" }
];

const borrowRecords = [
	{ id: 1, bookId: 1, userId: 1, borrowDate: "2023-08-15", dueDate: "2023-08-29", returnDate: null },
	{ id: 2, bookId: 2, userId: 1, borrowDate: "2023-08-20", dueDate: "2023-09-03", returnDate: null }
];

const fineRecords = [
	{ id: 1, userId: 1, amount: 5.00, reason: "Late return", status: "unpaid" }
];

let currentUser = null;

// DOM Elements
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const roleMenu = document.getElementById('role-menu');
const dashboardTitle = document.getElementById('dashboard-title');
const dashboardContent = document.getElementById('dashboard-content');
const bookModal = document.getElementById('book-modal');
const bookModalContent = document.getElementById('book-modal-content');
const navLogin = document.getElementById('nav-login');
const navLogout = document.getElementById('nav-logout');

// Event Listeners
if (loginForm) loginForm.addEventListener('submit', handleLogin);
if (navLogout) navLogout.addEventListener('click', handleLogout);
const closeModalBtn = document.querySelector('.close-modal');
if (closeModalBtn) closeModalBtn.addEventListener('click', () => {
	bookModal.style.display = 'none';
});

// Functions
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    const user = users.find(u => 
        u.username.trim().toLowerCase() === username &&
        u.password === password &&
        u.role === role
    );

    if (user) {
        currentUser = user;
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        navLogin.style.display = 'none';
        navLogout.style.display = 'block';
        setupDashboard();
    } else {
        alert('Invalid credentials or role. Please try again.');
    }
}

function handleLogout() {
	currentUser = null;
	loginSection.style.display = 'block';
	dashboardSection.style.display = 'none';
	navLogin.style.display = 'block';
	navLogout.style.display = 'none';
	loginForm.reset();
}

function setupDashboard() {
	// Clear previous menu
	roleMenu.innerHTML = '';
	// Set dashboard title
	dashboardTitle.textContent = `${currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} Dashboard`;
	// Create menu based on user role
	switch(currentUser.role) {
		case 'student':
			createStudentMenu();
			showStudentDashboard();
			break;
		case 'librarian':
			createLibrarianMenu();
			showLibrarianDashboard();
			break;
		case 'manager':
			createManagerMenu();
			showManagerDashboard();
			break;
		case 'stock_manager':
			createStockManagerMenu();
			showStockManagerDashboard();
			break;
		case 'accountant':
			createAccountantMenu();
			showAccountantDashboard();
			break;
	}
}

function createStudentMenu() {
	const menuItems = [
		{ id: 'student-dashboard', text: 'Dashboard', handler: showStudentDashboard },
		{ id: 'search-books', text: 'Search Books', handler: showSearchBooks },
		{ id: 'my-books', text: 'My Books', handler: showMyBooks },
		{ id: 'borrowing-history', text: 'Borrowing History', handler: showBorrowingHistory },
		{ id: 'pay-fines', text: 'Pay Fines', handler: showPayFines }
	];
	createMenu(menuItems);
}

function createLibrarianMenu() {
	const menuItems = [
		{ id: 'librarian-dashboard', text: 'Dashboard', handler: showLibrarianDashboard }
	];
	createMenu(menuItems);
}

function createManagerMenu() {
	const menuItems = [
		{ id: 'manager-dashboard', text: 'Dashboard', handler: showManagerDashboard },
		{ id: 'issue-books', text: 'Issue Books', handler: showIssueBooks },
		{ id: 'collect-books', text: 'Collect Returns', handler: showCollectReturns },
		{ id: 'student-accounts', text: 'Student Accounts', handler: showStudentAccounts }
	];
	createMenu(menuItems);
}

function createStockManagerMenu() {
	const menuItems = [
		{ id: 'stock-dashboard', text: 'Dashboard', handler: showStockManagerDashboard },
		{ id: 'add-books', text: 'Add Book Data', handler: showAddBookData },
		{ id: 'order-requests', text: 'Raise Order Requests', handler: showOrderRequests },
		{ id: 'stock-alerts', text: 'Stock Alerts', handler: showStockAlerts },
		{ id: 'order-confirmations', text: 'Order Confirmations', handler: showOrderConfirmations }
	];
	createMenu(menuItems);
}

function createAccountantMenu() {
    const menuItems = [
        { id: 'accountant-dashboard', text: 'Dashboard', handler: showAccountantDashboard },
        { id: 'fine-reports', text: 'Fine Reports', handler: showFineReports },
        { id: 'payment-ack', text: 'Payment Acknowledgements', handler: showPaymentAcknowledgements },
        { id: 'issue-receipts', text: 'Issue Payment Receipts', handler: showIssueReceipts },
        { id: 'issue-fine', text: 'Issue Fine', handler: showIssueFine } // <-- Add this line
    ];
    createMenu(menuItems);
}

function createMenu(items) {
	items.forEach(item => {
		const li = document.createElement('li');
		const a = document.createElement('a');
		a.href = '#';
		a.textContent = item.text;
		a.addEventListener('click', item.handler);
		li.appendChild(a);
		roleMenu.appendChild(li);
	});
}

// Dashboard Content Functions
function showStudentDashboard() {
	dashboardContent.innerHTML = `
		<div class="card">
			<h3>Welcome, ${currentUser.name}</h3>
			<p>You have ${borrowRecords.filter(r => r.userId === currentUser.id && !r.returnDate).length} books currently borrowed.</p>
			<p>You have ${fineRecords.filter(f => f.userId === currentUser.id && f.status === 'unpaid').length} unpaid fines.</p>
		</div>
		<div class="card">
			<h3>Quick Actions</h3>
			<button class="btn btn-primary" onclick="showSearchBooks()">Search Books</button>
			<button class="btn" onclick="showMyBooks()">View My Books</button>
			<button class="btn" onclick="showPayFines()">Pay Fines</button>
		</div>
	`;
}

function showSearchBooks() {
	dashboardContent.innerHTML = `
		<div class="card">
			<h3>Catalogue Search</h3>
			<div class="search-form">
				<input type="text" placeholder="Search by title, author, or subject..." id="search-input">
				<button onclick="performSearch()">Search</button>
			</div>
			<div id="search-results">
				<table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Author</th>
							<th>Subject</th>
							<th>Available</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						${books.map(book => `
							<tr>
								<td>${book.title}</td>
								<td>${book.author}</td>
								<td>${book.subject}</td>
								<td>${book.available}/${book.copies}</td>
								<td><button class="btn btn-primary" onclick="viewBook(${book.id})">View</button></td>
							</tr>
						`).join('')}
					</tbody>
				</table>
			</div>
		</div>
	`;
}

function performSearch() {
	const searchInput = document.getElementById('search-input');
	if (!searchInput) return;
	const searchTerm = searchInput.value.trim().toLowerCase();
	if (!searchTerm) {
		alert('Please enter a search term.');
		return;
	}
	const filteredBooks = books.filter(book => 
		book.title.toLowerCase().includes(searchTerm) ||
		book.author.toLowerCase().includes(searchTerm) ||
		book.subject.toLowerCase().includes(searchTerm)
	);
	const resultsTable = document.querySelector('#search-results table tbody');
	if (!resultsTable) return;
	if (filteredBooks.length === 0) {
		resultsTable.innerHTML = '<tr><td colspan="5">No books found.</td></tr>';
	} else {
		resultsTable.innerHTML = filteredBooks.map(book => `
			<tr>
				<td>${book.title}</td>
				<td>${book.author}</td>
				<td>${book.subject}</td>
				<td>${book.available}/${book.copies}</td>
				<td><button class="btn btn-primary" onclick="viewBook(${book.id})">View</button></td>
			</tr>
		`).join('');
	}
}

function viewBook(bookId) {
	const book = books.find(b => b.id === bookId);
	bookModalContent.innerHTML = `
		<h3>${book.title}</h3>
		<p><strong>Author:</strong> ${book.author}</p>
		<p><strong>Subject:</strong> ${book.subject}</p>
		<p><strong>Copies Available:</strong> ${book.available}/${book.copies}</p>
		${currentUser.role === 'student' ? `
			<button class="btn btn-primary" onclick="borrowBook(${book.id})">Borrow This Book</button>
		` : ''}
	`;
	bookModal.style.display = 'flex';
}

function borrowBook(bookId) {
	const book = books.find(b => b.id === bookId);
	if (!book) {
		alert('Book not found.');
		return;
	}
	if (book.available <= 0) {
		alert('No copies available for borrowing.');
		return;
	}
	// Check if user has already borrowed this book and not returned
	const alreadyBorrowed = borrowRecords.some(r => r.userId === currentUser.id && r.bookId === bookId && !r.returnDate);
	if (alreadyBorrowed) {
		alert('You have already borrowed this book and not returned it.');
		return;
	}
	// Check if user has unpaid fines
	const userFines = fineRecords.filter(f => f.userId === currentUser.id && f.status === 'unpaid');
	if (userFines.length > 0) {
		alert('You have unpaid fines. Please pay them before borrowing more books.');
		return;
	}
	// Check if user has reached borrowing limit
	const userBorrowedBooks = borrowRecords.filter(r => r.userId === currentUser.id && !r.returnDate);
	if (userBorrowedBooks.length >= 4) {
		alert('You have reached the maximum borrowing limit (4 books).');
		return;
	}
	// Create borrow record with hold rules (if book is on hold, cannot borrow)
	// For demo, assume no hold system yet
	const today = new Date();
	const dueDate = new Date();
	dueDate.setDate(today.getDate() + 14);
	borrowRecords.push({
		id: borrowRecords.length + 1,
		bookId: bookId,
		userId: currentUser.id,
		borrowDate: today.toISOString().split('T')[0],
		dueDate: dueDate.toISOString().split('T')[0],
		returnDate: null
	});
	// Update book availability
	book.available--;
	alert('Book borrowed successfully. Due date: ' + dueDate.toISOString().split('T')[0]);
	bookModal.style.display = 'none';
	showSearchBooks();
}

function showMyBooks() {
	const userBorrowedBooks = borrowRecords.filter(r => r.userId === currentUser.id && !r.returnDate);
	dashboardContent.innerHTML = `
		<div class="card">
			<h3>My Borrowed Books</h3>
			${userBorrowedBooks.length > 0 ? `
				<table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Author</th>
							<th>Borrow Date</th>
							<th>Due Date</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						${userBorrowedBooks.map(record => {
							const book = books.find(b => b.id === record.bookId);
							return `
								<tr>
									<td>${book.title}</td>
									<td>${book.author}</td>
									<td>${record.borrowDate}</td>
									<td>${record.dueDate}</td>
									<td><button class="btn btn-primary" onclick="returnBook(${record.id})">Return</button></td>
								</tr>
							`;
						}).join('')}
					</tbody>
				</table>
			` : '<p>You have no books currently borrowed.</p>'}
		</div>
	`;
}

function returnBook(recordId) {
	const record = borrowRecords.find(r => r.id === recordId);
	const book = books.find(b => b.id === record.bookId);
	// Update return date
	record.returnDate = new Date().toISOString().split('T')[0];
	// Update book availability
	book.available++;
	// Check if book is overdue and add fine if needed
	const dueDate = new Date(record.dueDate);
	const returnDate = new Date(record.returnDate);
	if (returnDate > dueDate) {
		const daysLate = Math.floor((returnDate - dueDate) / (1000 * 60 * 60 * 24));
		const fineAmount = daysLate * 2; // $2 per day late
		fineRecords.push({
			id: fineRecords.length + 1,
			userId: currentUser.id,
			amount: fineAmount,
			reason: `Late return of "${book.title}" by ${daysLate} days`,
			status: 'unpaid'
		});
		alert(`Book returned successfully. You have been charged a fine of $${fineAmount.toFixed(2)} for returning ${daysLate} days late.`);
	} else {
		alert('Book returned successfully.');
	}
	showMyBooks();
}

function showBorrowingHistory() {
	const userRecords = borrowRecords.filter(r => r.userId === currentUser.id);
	dashboardContent.innerHTML = `
		<div class="card">
			<h3>Borrowing History & Account Overview</h3>
			${userRecords.length > 0 ? `
				<table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Author</th>
							<th>Borrow Date</th>
							<th>Due Date</th>
							<th>Return Date</th>
						</tr>
					</thead>
					<tbody>
						${userRecords.map(record => {
							const book = books.find(b => b.id === record.bookId);
							return `
								<tr>
									<td>${book.title}</td>
									<td>${book.author}</td>
									<td>${record.borrowDate}</td>
									<td>${record.dueDate}</td>
									<td>${record.returnDate || 'Not returned yet'}</td>
								</tr>
							`;
						}).join('')}
					</tbody>
				</table>
			` : '<p>You have no borrowing history.</p>'}
			<div><strong>Account Email:</strong> ${currentUser.email}</div>
		</div>
	`;
}

function showPaymentGateway(fineId, amount, callback) {
    dashboardContent.innerHTML += `
        <div id="payment-modal" class="modal" style="display:flex;">
            <div class="modal-content" style="background:#fff;padding:20px;border-radius:8px;max-width:350px;margin:auto;">
                <h3>Payment Gateway</h3>
                <p>Pay $${amount.toFixed(2)} for this fine.</p>
                <button class="btn btn-primary" id="pay-confirm">Confirm Payment</button>
                <button class="btn" id="pay-cancel">Cancel</button>
            </div>
        </div>
    `;
    document.getElementById('pay-confirm').onclick = function() {
        document.getElementById('payment-modal').remove();
        callback(true);
    };
    document.getElementById('pay-cancel').onclick = function() {
        document.getElementById('payment-modal').remove();
        callback(false);
    };
}

// Student: Pay Individual Fine
function showPayFines() {
    const userFines = fineRecords.filter(f => f.userId === currentUser.id && f.status === 'unpaid');
    const totalAmount = userFines.reduce((sum, fine) => sum + fine.amount, 0);
    dashboardContent.innerHTML = `
        <div class="card">
            <h3>Fine Assessment & Payment</h3>
            ${userFines.length > 0 ? `
                <table>
                    <thead>
                        <tr>
                            <th>Reason</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${userFines.map(fine => `
                            <tr>
                                <td>${fine.reason}</td>
                                <td>$${fine.amount.toFixed(2)}</td>
                                <td>${fine.status}</td>
                                <td>
                                    <button class="btn btn-primary" onclick="payFine(${fine.id})">Pay</button>
                                </td>
                            </tr>
                        `).join('')}
                        <tr>
                            <td><strong>Total</strong></td>
                            <td><strong>$${totalAmount.toFixed(2)}</strong></td>
                            <td></td>
                            <td>
                                <button class="btn btn-primary" onclick="payAllFines()">Pay All Fines</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            ` : '<p>You have no unpaid fines.</p>'}
        </div>
    `;
}

// Individual fine payment
window.payFine = function(fineId) {
    const fine = fineRecords.find(f => f.id === fineId && f.userId === currentUser.id && f.status === 'unpaid');
    if (!fine) return;
    showPaymentGateway(fineId, fine.amount, function(success) {
        if (success) {
            fine.status = 'paid';
            fine.paidDate = new Date().toISOString().split('T')[0];
            fine.paidBy = currentUser.id;
            fine.acknowledgedBy = 5; // Accountant userId (assumed 5)
            alert('Payment successful for this fine.');
            showPayFines();
        }
    });
};

function payAllFines() {
    const userFines = fineRecords.filter(f => f.userId === currentUser.id && f.status === 'unpaid');
    const paidDate = new Date().toISOString().split('T')[0];
    userFines.forEach(fine => {
        fine.status = 'paid';
        fine.paidDate = paidDate;
        fine.paidBy = currentUser.id;
        fine.acknowledgedBy = 5; // Accountant userId (assumed 5)
    });
    alert('Payment successful. All fines have been paid.');
    showPayFines();
}

// --- Stock Manager: Raise Book Order Request ---
const orderRequests = []; // Store order requests

function showOrderRequests() {
    let bookOptions = books.map(b => `<option value="${b.id}">${b.title} (${b.available}/${b.copies})</option>`).join('');
    dashboardContent.innerHTML = `
        <div class='card'>
            <h3>Raise Book Order Request</h3>
            <form id="order-request-form">
                <label>Book:</label>
                <select id="order-book">${bookOptions}</select>
                <label>Quantity:</label>
                <input type="number" id="order-qty" min="1" required>
                <button type="submit" class="btn btn-primary">Raise Request</button>
            </form>
            <div id="order-output"></div>
            <h4>Order Requests Raised</h4>
            <ul>
                ${orderRequests.length > 0 ? orderRequests.map(req => {
                    const book = books.find(b => b.id === req.bookId);
                    return `<li>${book.title} - Qty: ${req.qty} (Status: ${req.status})</li>`;
                }).join('') : '<li>No requests yet.</li>'}
            </ul>
        </div>
    `;
    document.getElementById('order-request-form').onsubmit = function(e) {
        e.preventDefault();
        const bookId = parseInt(document.getElementById('order-book').value);
        const qty = parseInt(document.getElementById('order-qty').value);
        if (!bookId || isNaN(qty) || qty < 1) {
            alert('Please fill all fields correctly.');
            return;
        }
        orderRequests.push({
            id: orderRequests.length + 1,
            bookId,
            qty,
            status: 'Requested',
            date: new Date().toISOString().split('T')[0]
        });
        document.getElementById('order-output').innerHTML = `<p>Order request raised for ${qty} copies of ${books.find(b=>b.id===bookId).title}.</p>`;
        showOrderRequests();
    };
}

// --- Stock Alert: When Book Copies = 1 ---
function showStockAlerts() {
    const lowStockBooks = books.filter(b => b.available === 1);
    dashboardContent.innerHTML = `
        <div class='card'>
            <h3>Stock Alerts</h3>
            ${lowStockBooks.length > 0 ? `
                <ul>
                    ${lowStockBooks.map(b => `<li><strong>${b.title}</strong> - Only 1 copy left!</li>`).join('')}
                </ul>
            ` : '<p>No stock alerts. All books have more than 1 copy available.</p>'}
        </div>
    `;
}

// Other role-specific dashboard functions would be implemented similarly
function showLibrarianDashboard() {
	dashboardContent.innerHTML = `
		<div class="card">
			<h3>Librarian Dashboard</h3>
			<p>Welcome, ${currentUser.name}. You oversee the whole Library Management System.</p>
			<button class="btn" onclick="showAllBooks()">View All Books</button>
			<button class="btn" onclick="showAllUsers()">View All Users</button>
			<button class="btn" onclick="showAllFines()">View All Fines</button>
			<button class="btn" onclick="showStockOverview()">View Stock</button>
		</div>
	`;
}

window.showAllBooks = function() {
	dashboardContent.innerHTML = `<div class='card'><h3>All Books</h3><table><thead><tr><th>Title</th><th>Author</th><th>Subject</th><th>Available</th><th>Total</th></tr></thead><tbody>${books.map(b => `<tr><td>${b.title}</td><td>${b.author}</td><td>${b.subject}</td><td>${b.available}</td><td>${b.copies}</td></tr>`).join('')}</tbody></table></div>`;
}
window.showAllUsers = function() {
	dashboardContent.innerHTML = `<div class='card'><h3>All Users</h3><table><thead><tr><th>Name</th><th>Username</th><th>Role</th><th>Email</th></tr></thead><tbody>${users.map(u => `<tr><td>${u.name}</td><td>${u.username}</td><td>${u.role}</td><td>${u.email}</td></tr>`).join('')}</tbody></table></div>`;
}
window.showAllFines = function() {
	dashboardContent.innerHTML = `<div class='card'><h3>All Fines</h3><table><thead><tr><th>User</th><th>Amount</th><th>Reason</th><th>Status</th></tr></thead><tbody>${fineRecords.map(f => `<tr><td>${users.find(u=>u.id===f.userId)?.name||f.userId}</td><td>$${f.amount.toFixed(2)}</td><td>${f.reason}</td><td>${f.status}</td></tr>`).join('')}</tbody></table></div>`;
}
window.showStockOverview = function() {
	dashboardContent.innerHTML = `<div class='card'><h3>Stock Overview</h3><table><thead><tr><th>Title</th><th>Available</th><th>Total</th></tr></thead><tbody>${books.map(b => `<tr><td>${b.title}</td><td>${b.available}</td><td>${b.copies}</td></tr>`).join('')}</tbody></table></div>`;
}


function showIssueBooks() {
	let studentOptions = users.filter(u => u.role === 'student').map(u => `<option value="${u.id}">${u.name}</option>`).join('');
	let bookOptions = books.filter(b => b.available > 0).map(b => `<option value="${b.id}">${b.title}</option>`).join('');
	dashboardContent.innerHTML = `
		<div class="card">
			<h3>Issue Books to Students</h3>
			<form id="issue-form">
				<label>Student:</label>
				<select id="issue-student">${studentOptions}</select>
				<label>Book:</label>
				<select id="issue-book">${bookOptions}</select>
				<button type="submit" class="btn btn-primary">Issue Book</button>
			</form>
		</div>
	`;
	document.getElementById('issue-form').onsubmit = function(e) {
		e.preventDefault();
		const studentId = parseInt(document.getElementById('issue-student').value);
		const bookId = parseInt(document.getElementById('issue-book').value);
		const book = books.find(b => b.id === bookId);
		if (!book || book.available <= 0) {
			alert('Book not available.');
			return;
		}
		borrowRecords.push({
			id: borrowRecords.length + 1,
			bookId,
			userId: studentId,
			borrowDate: new Date().toISOString().split('T')[0],
			dueDate: new Date(Date.now() + 14*24*60*60*1000).toISOString().split('T')[0],
			returnDate: null
		});
		book.available--;
		alert('Book issued successfully!');
		showIssueBooks();
	};
}

function showManagerDashboard() {
	dashboardContent.innerHTML = `
		<div class="card">
			<h3>Manager Dashboard</h3>
			<p>Welcome, ${currentUser.name}. You issue and collect books, and manage student accounts.</p>
		</div>
	`;
}

function showStockManagerDashboard() {
	dashboardContent.innerHTML = `
		<div class="card">
			<h3>Stock Manager Dashboard</h3>
			<p>Welcome, ${currentUser.name}. You add book data, raise order requests when low stock, receive stock alerts and order confirmations.</p>
		</div>
	`;
}

function showAccountantDashboard() {
	dashboardContent.innerHTML = `
		<div class="card">
			<h3>Accountant Dashboard</h3>
			<p>Welcome, ${currentUser.name}. You receive fine reports and payment acknowledgements, issue payment confirmation receipts.</p>
		</div>
	`;
}

function showFineReports() {
	dashboardContent.innerHTML = `<div class='card'><h3>Fine Reports</h3><pre>${JSON.stringify(fineRecords, null, 2)}</pre></div>`;
}
function showPaymentAcknowledgements() {
    const paidFines = fineRecords.filter(f => f.status === 'paid');
    dashboardContent.innerHTML = `
        <div class='card'>
            <h3>Payment Acknowledgements</h3>
            ${paidFines.length > 0 ? `
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Amount</th>
                            <th>Reason</th>
                            <th>Date Paid</th>
                            <th>Paid By</th>
                            <th>Acknowledged By</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${paidFines.map(f => {
                            const user = users.find(u => u.id === f.userId);
                            const paidBy = users.find(u => u.id === f.paidBy);
                            const ackBy = users.find(u => u.id === f.acknowledgedBy);
                            return `
                                <tr>
                                    <td>${user ? user.name : f.userId}</td>
                                    <td>$${f.amount.toFixed(2)}</td>
                                    <td>${f.reason}</td>
                                    <td>${f.paidDate || 'N/A'}</td>
                                    <td>${paidBy ? paidBy.name : ''}</td>
                                    <td>${ackBy ? ackBy.name : ''}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            ` : '<p>No payments acknowledged yet.</p>'}
        </div>
    `;
}

function showIssueReceipts() {
    const paidFines = fineRecords.filter(f => f.status === 'paid');
    const studentOptions = users.filter(u => u.role === 'student').map(u => `<option value="${u.id}">${u.name}</option>`).join('');
    dashboardContent.innerHTML = `
        <div class='card'>
            <h3>Issue Payment Receipt</h3>
            <form id="receipt-form">
                <label>Select Student:</label>
                <select id="receipt-student">${studentOptions}</select>
                <button type="submit" class="btn btn-primary">Issue Receipt</button>
            </form>
            <div id="receipt-output"></div>
        </div>
    `;
    document.getElementById('receipt-form').onsubmit = function(e) {
        e.preventDefault();
        const studentId = parseInt(document.getElementById('receipt-student').value);
        const student = users.find(u => u.id === studentId);
        const studentFines = fineRecords.filter(f => f.userId === studentId && f.status === 'paid');
        const totalPaid = studentFines.reduce((sum, f) => sum + f.amount, 0);
        const receiptDiv = document.getElementById('receipt-output');
        if (studentFines.length === 0) {
            receiptDiv.innerHTML = `<p>No paid fines for ${student.name}.</p>`;
        } else {
            receiptDiv.innerHTML = `
                <div class="card">
                    <h4>Payment Receipt</h4>
                    <p><strong>Student:</strong> ${student.name}</p>
                    <p><strong>Email:</strong> ${student.email}</p>
                    <p><strong>Total Paid:</strong> $${totalPaid.toFixed(2)}</p>
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                    <ul>
                        ${studentFines.map(f => `<li>${f.reason}: $${f.amount.toFixed(2)}</li>`).join('')}
                    </ul>
                    <p><em>Receipt issued by Accountant: ${currentUser.name}</em></p>
                </div>
            `;
        }
    };
}

// Stock Manager functions
function showAddBookData() {
    dashboardContent.innerHTML = `
        <div class='card'>
            <h3>Add Book Data</h3>
            <form id="add-book-form">
                <label>Title:</label>
                <input type="text" id="add-title" required>
                <label>Author:</label>
                <input type="text" id="add-author" required>
                <label>Subject:</label>
                <input type="text" id="add-subject" required>
                <label>Total Copies:</label>
                <input type="number" id="add-copies" min="1" required>
                <button type="submit" class="btn btn-primary">Add Book</button>
            </form>
        </div>
    `;
    document.getElementById('add-book-form').onsubmit = function(e) {
        e.preventDefault();
        const title = document.getElementById('add-title').value.trim();
        const author = document.getElementById('add-author').value.trim();
        const subject = document.getElementById('add-subject').value.trim();
        const copies = parseInt(document.getElementById('add-copies').value);
        if (!title || !author || !subject || isNaN(copies) || copies < 1) {
            alert('Please fill all fields correctly.');
            return;
        }
        books.push({
            id: books.length + 1,
            title,
            author,
            subject,
            copies,
            available: copies
        });
        alert('Book added successfully!');
        showAddBookData();
    };
}
function showOrderRequests() {
	dashboardContent.innerHTML = `<div class='card'><h3>Order Requests</h3><p>Feature to raise order requests for low stock (to be implemented).</p></div>`;
}
function showStockAlerts() {
	dashboardContent.innerHTML = `<div class='card'><h3>Stock Alerts</h3><p>Feature to receive stock alerts (to be implemented).</p></div>`;
}
function showOrderConfirmations() {
	dashboardContent.innerHTML = `<div class='card'><h3>Order Confirmations</h3><p>Feature to receive order confirmations (to be implemented).</p></div>`;
}

// Initialize the application
window.onclick = function(event) {
	if (event.target === bookModal) {
		bookModal.style.display = 'none';
	}
};
// Add some fun interactivity and visuals to make the page more interesting
// 1. Animated header
// 2. Book search with filter
// 3. Random book highlight
// 4. Fun facts modal
// 5. Button hover effects

// Animated header
const header = document.querySelector('header h1');
if (header) {
    header.style.transition = 'color 0.5s';
    header.addEventListener('mouseover', () => header.style.color = '#e67e22');
    header.addEventListener('mouseout', () => header.style.color = '#fff');
}

// Book search filter
const searchInput = document.querySelector('.search input');
const bookRows = document.querySelectorAll('.book-list tbody tr');
if (searchInput && bookRows.length > 0) {
    searchInput.addEventListener('input', function() {
        const val = this.value.toLowerCase();
        bookRows.forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(val) ? '' : 'none';
        });
    });
}

// Random book highlight
function highlightRandomBook() {
    if (bookRows.length > 0) {
        bookRows.forEach(row => row.style.background = '');
        const idx = Math.floor(Math.random() * bookRows.length);
        bookRows[idx].style.background = '#ffeaa7';
    }
}
if (bookRows.length > 0) {
    setInterval(highlightRandomBook, 4000);
}

function showIssueFine() {
    const studentOptions = users.filter(u => u.role === 'student').map(u => `<option value="${u.id}">${u.name}</option>`).join('');
    dashboardContent.innerHTML = `
        <div class='card'>
            <h3>Issue Fine to Student</h3>
            <form id="issue-fine-form">
                <label>Select Student:</label>
                <select id="fine-student">${studentOptions}</select>
                <label>Fine Amount ($):</label>
                <input type="number" id="fine-amount" min="1" required>
                <label>Cause/Reason:</label>
                <input type="text" id="fine-cause" required>
                <button type="submit" class="btn btn-primary">Issue Fine</button>
            </form>
            <div id="fine-output"></div>
        </div>
    `;
    document.getElementById('issue-fine-form').onsubmit = function(e) {
        e.preventDefault();
        const studentId = parseInt(document.getElementById('fine-student').value);
        const amount = parseFloat(document.getElementById('fine-amount').value);
        const cause = document.getElementById('fine-cause').value.trim();
        if (!studentId || isNaN(amount) || amount <= 0 || !cause) {
            alert('Please fill all fields correctly.');
            return;
        }
        fineRecords.push({
            id: fineRecords.length + 1,
            userId: studentId,
            amount: amount,
            reason: cause,
            status: 'unpaid'
        });
        document.getElementById('fine-output').innerHTML = `<p>Fine of $${amount.toFixed(2)} issued to ${users.find(u=>u.id===studentId).name} for: "${cause}"</p>`;
    };
}