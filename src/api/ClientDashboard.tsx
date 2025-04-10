import { useState } from 'react';
import '../styles/bank.css';
import '../components/LogoutButton';
import { handleLogout } from '../components/LogoutButton';
import '../styles/Loans.css'

function ClientDashboard() {
  const [activeView, setActiveView] = useState('dashboard'); // Default view
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  // Fake data for accounts, transactions, and cards. | EXAMPLES OF DATA VIEW.
  const accounts = [
    { id: 1, name: 'Checking Account', balance: '$45,200.50', number: '**** 4582' },
    { id: 2, name: 'Saving Account', balance: '$12,800.00', number: '**** 3267' },
  ];

  const transactions = [
    { id: 1, date: '03/15/2025', description: 'Personal Loan', amount: '+$1,500.00', category: 'income' },
    { id: 2, date: '14/03/2023', description: 'Debt Consolidation', amount: '-$350.75', category: 'missing' },
    { id: 3, date: '12/03/2023', description: 'Mortgage', amount: '-$125.40', category: 'missing' },
    { id: 4, date: '10/03/2023', description: 'Auto Loan', amount: '+$2,000.00', category: 'missing' },
  ];

  const cards = [
    { id: 1, type: 'VISA', number: '**** **** **** 4582', expiry: '12/25' },
    { id: 2, type: 'Mastercard', number: '**** **** **** 3267', expiry: '10/24' },
  ];

  // View components.
  const DashboardView = () => (
    <div className="view-content">
      <h2>Resumen</h2>
      <div className="accounts-summary">
        {accounts.map(account => ( // Displaying account information
          <div key={account.id} className="account-card">
            <div className="account-info">
              <h3>{account.name}</h3>
              <span>{account.number}</span>
            </div>
            <div className="account-balance">{account.balance}</div>
          </div>
        ))}
      </div>

      <div className="recent-transactions">
        <div className="section-header">
          <h3>Last Loans</h3>
          <button className="text-button">View All</button>
        </div>
        <div className="transactions-list">
          {transactions.slice(0, 3).map(transaction => ( // Displaying recent transactions, slicing the first 3, Icon based on transaction type
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-icon"> 
                {transaction.category === 'income' ? '↑' : '↓'}  
              </div>  
              <div className="transaction-details">
                <div className="transaction-description">{transaction.description}</div>
                <div className="transaction-date">{transaction.date}</div>
              </div>
              <div className={`transaction-amount ${transaction.category === 'income' ? 'income' : 'expense'}`}>
                {transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // TransactionsView component to display all transactions.
  const TransactionsView = () => (
    <div className="view-content">
      <h2>All the loans</h2>
      {/* Added section */}
      
      <form className='contengrill'>  
      <div className="form-group ">
            <label>Loan Application:</label>
            <select
              name="loan_application_id"
              /*value={newLoan.loan_type_id}
              onChange={handleInputChange}*/
              required
            >
              <option value="">Select a loan application</option>
              {/*{loanTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}*/}
            </select>        
          </div>
          <div className="form-group">
             <label>Loan type:</label>
            <select
              name="loan_type_id"
              /*value={newLoan.loan_type_id}
              onChange={handleInputChange}*/
              required
            >
              <option value="">Select a loan type</option>
              {/*{loanTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}*/}
            </select>
          </div>
          <div className="form-group">
            <label>Principal Amount:</label>
            <input
              type="number"
              name="principal_balance"
              /*value={newLoan.principal_balance}
              onChange={handleInputChange}*/
              required
              min="0"
              step="0.01"
            />
          </div>      

          <div className="form-group">
            <label>Term Length (months):</label>
            <input
              type="number"
              name="term_length"
             /* value={newLoan.term_length}
              onChange={handleInputChange}*/
              required
              min="1"
            />
          </div>

          <div className="form-group">
            <label>Interest Rate (%):</label>
            <input
              type="number"
              name="interest"
             /* value={newLoan.interest}
              onChange={handleInputChange}*/
              required
              min="0"
              max="100"
              step="0.01"
            />
          </div>

          <div className="form-group">
              <label>Total Balance ($):</label>
              <input
                type="number"
                name="total_balance"
                /*value={newLoan.total_balance}
                onChange={handleInputChange}*/
                required
                min="0"
                step="0.01"
                /*readOnly={!!newLoan.principal_balance && !!newLoan.interest}*/
              />
            </div>
            
            <div className="form-group">
              <label>Application Status ID:</label>
              <input
                type="number"
                name="Application_Status_id"
                /*value={newLoan.application_Status_id}
                onChange={handleInputChange}*/
                required
                min="1"
              />
            </div>
            
            <div className="form-group">
              <label>User Profile ID:</label>
              <input
                type="number"
                name="user_profile_id"
                /*value={newLoan.user_profile_id}
                onChange={handleInputChange}*/
                required
                min="1"
              />
            </div>



            <div className="form-group">
              <label>Application Date:</label>
              <input
                type="date"
                name="application_date"
                /*value={newLoan.application_date}
                onChange={handleInputChange}*/
                required
              />
            </div>
            <button type="submit" className="submit-button">Add Loan</button>      
      </form>


      {/* added section */}
      <div className="transactions-list full-list">
        {transactions.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-icon">
              {transaction.category === 'income' ? '↑' : '↓'}
            </div>
            <div className="transaction-details">
              <div className="transaction-description">{transaction.description}</div>
              <div className="transaction-date">{transaction.date}</div>
            </div>
            <div className={`transaction-amount ${transaction.category === 'income' ? 'income' : 'expense'}`}>
              {transaction.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // CardsView component to manage user cards.
  const CardsView = () => (
    <div className="view-content">
      <h2>Tarjetas</h2>
      <div className="cards-grid">
        {cards.map(card => (
          <div key={card.id} className="card-item">
            <div className="card-type">{card.type}</div>
            <div className="card-number">{card.number}</div>
            <div className="card-expiry">Expira: {card.expiry}</div>
            <button className="card-action">Gestionar</button>
          </div>
        ))}
        <div className="add-card">
          <div className="add-card-icon">+</div>
          <div className="add-card-text">Añadir tarjeta</div>
        </div>
      </div>
    </div>
  );

  // TransferView component to handle money transfers between accounts. | CHANGE THIS FOR LOANS
  const TransferView = () => (
    <div className="view-content">
      <h2>Transferencias</h2>
      <div className="transfer-form">
        <div className="form-group">
          <label>Desde cuenta</label>
          <select>
            {accounts.map(account => (
              <option key={account.id}>{account.name} - {account.number}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Número de cuenta destino</label>
          <input type="text" placeholder="Ingresa el número de cuenta" />
        </div>
        <div className="form-group">
          <label>Monto</label>
          <input type="text" placeholder="$0.00" />
        </div>
        <div className="form-group">
          <label>Concepto</label>
          <input type="text" placeholder="Descripción opcional" />
        </div>
        <button className="primary-button">Realizar transferencia</button>
      </div>
    </div>
  );

  // SettingsView component to manage user settings.
  const SettingsView = () => (
    <div className="view-content">
      <h2>Settings</h2>
      <div className="settings-options">
        <div className="setting-item">
          <div className="setting-info">
            <h3>Theme</h3>
            <p>Change to dark mode or light mode.</p>
          </div>
          <button 
            className="toggle-button"
            onClick={() => setDarkMode(!darkMode)}
          >
            <div className={`toggle-circle ${darkMode ? 'dark' : 'light'}`}></div>
          </button>
        </div>
        <div className="setting-item">
          <div className="setting-info">
          <h3>Profile</h3>
          <p>Manage profile information.</p>
          </div>
          <button className="text-button">Configure</button>
        </div>
        <div className="setting-item">
          <div className="setting-info">
            <h3>Security</h3>
            <p>Change your password.</p>
          </div>
          <button className="text-button">Manage</button>
        </div>
        <div className="setting-item">
          <div className="setting-info">
            <h3>Login</h3>
            <p>Log out session.</p>
          </div>
          <button className="text-button" onClick={handleLogout}>Click here</button>
        </div>
      </div>
    </div>
  );

  

  // Main component rendering the dashboard with sidebar and views.
  return (
    <div className={`bank-app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <div className="header-content">
          <h1 className="bank-logo">JAVENGERS BANK</h1>
          <div className="user-profile">
            <div className="user-avatar">CL</div>
          </div>
        </div>
      </header>

      <div className="main-content">
        <nav className="sidebar">
          <ul className="nav-menu">
            <li 
          
              className={activeView === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveView('dashboard')}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-text">Resume</span>
            </li>
            <li 
              className={activeView === 'transactions' ? 'active' : ''}
              onClick={() => setActiveView('transactions')}
            >
              <span className="nav-icon">🔄</span>
              <span className="nav-text">Loans</span>
            </li>
             <li 
              className={activeView === 'cards' ? 'active' : ''}
              onClick={() => setActiveView('cards')}
            >
              <span className="nav-icon">💳</span>
              <span className="nav-text">Cards</span>
            </li>
            <li 
              className={activeView === 'settings' ? 'active' : ''}
              onClick={() => setActiveView('settings')}
            >
              <span className="nav-icon">⚙️</span>
              <span className="nav-text">Configuration</span>
            </li>
          </ul>
        </nav>

        <main className="content-area">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'transactions' && <TransactionsView />}
          {activeView === 'transfer' && <TransferView />}
          {activeView === 'cards' && <CardsView />}
          {activeView === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
}

export default ClientDashboard;