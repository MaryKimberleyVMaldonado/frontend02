import { useEffect, useState } from 'react';
import '../styles/bank.css';
import LogoutButton from '../components/LogoutButton';
import '../styles/Loans.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Loan {
  id: number;
  loanType: {
    id: number;
    type: string;
  };
  principalBalance: number;
  termLength: number;
  interest: number;
  totalBalance: number;
  applicationStatus: {
    id: number;
    status: string;
  };
  userProfile: {
    id: number;
    firstName: string;
    lastName: string;
  };
  applicationDate: string;
}

interface UserProfile {
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  creditScore: number;
}

function ManagerDashboard() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('transactions');
  const [loans, setLoans] = useState<Loan[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [newProfile, setNewProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
    creditScore: 0
  });
  const [allProfiles, setAllProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/loans", {
        withCredentials: true,
      });
      setLoans(response.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user-profiles/me", {
        withCredentials: true,
      });
      setUserProfile(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setUserProfile(null);
      } else {
        console.error("Error fetching user profile:", error);
      }
    }
  };

  const createUserProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/user-profiles/me", newProfile, {
        withCredentials: true,
      });
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error creating user profile:", error);
    }
  };

  const fetchAllProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user-profiles", {
        withCredentials: true,
      });
      setAllProfiles(response.data);
    } catch (error) {
      console.error("Error fetching all profiles:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLoans();
      fetchUserProfile();
      fetchAllProfiles();
    }
  }, [user]);

  const ProfileView = () => (
    <div className="view-content">
      <h2>User Profile</h2>
      {userProfile ? (
        <div className="profile-card">
          <p><strong>Name:</strong> {userProfile.firstName} {userProfile.lastName}</p>
          <p><strong>Phone:</strong> {userProfile.phoneNumber}</p>
          <p><strong>Date of Birth:</strong> {userProfile.dateOfBirth}</p>
          <p><strong>Credit Score:</strong> {userProfile.creditScore}</p>
        </div>
      ) : (
        <form className="profile-form" onSubmit={createUserProfile}>
          <p>Profile not found. Create one:</p>
          <input type="text" placeholder="First Name" value={newProfile.firstName} onChange={(e) => setNewProfile({ ...newProfile, firstName: e.target.value })} required />
          <input type="text" placeholder="Last Name" value={newProfile.lastName} onChange={(e) => setNewProfile({ ...newProfile, lastName: e.target.value })} required />
          <input type="text" placeholder="Phone Number" value={newProfile.phoneNumber} onChange={(e) => setNewProfile({ ...newProfile, phoneNumber: e.target.value })} required />
          <input type="date" value={newProfile.dateOfBirth} onChange={(e) => setNewProfile({ ...newProfile, dateOfBirth: e.target.value })} required />
          <input type="number" placeholder="Credit Score" value={newProfile.creditScore} onChange={(e) => setNewProfile({ ...newProfile, creditScore: Number(e.target.value) })} required />
          <button type="submit" className="create-profile-button">
            \u2795 Create Profile
          </button>
        </form>
      )}
    </div>
  );

  const TransactionsView = () => (
    <div className="view-content">
      <h2>All the loans</h2>
      {loading ? (
        <div>Loading loans...</div>
      ) : (
        <div className="transactions-list full-list">
          {loans.map((loan) => (
            <div key={loan.id} className="transaction-item">
              <div className="transaction-icon">
                {loan.applicationStatus.status === 'Approved' ? '\u2705' :
                 loan.applicationStatus.status === 'Rejected' ? '\u274c' : ''}
              </div>
              <div className="transaction-details">
                <div className="transaction-description">
                  {loan.loanType.type} Loan - {loan.userProfile.firstName} {loan.userProfile.lastName}
                </div>
                <div className="transaction-date">
                  {new Date(loan.applicationDate).toLocaleDateString()}
                </div>
                <div>
                  Amount: ${loan.principalBalance} | Term: {loan.termLength} months
                </div>
              </div>
              <div className={`transaction-amount ${loan.applicationStatus.status.toLowerCase()}`}>
                {loan.applicationStatus.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const AllProfilesView = () => (
    <div className="view-content">
      <h2>All User Profiles</h2>
      <ul className="profile-list">
        {allProfiles.map((profile) => (
          <li key={profile.id} className="profile-item">
            <p><strong>{profile.firstName} {profile.lastName}</strong></p>
            <p>Phone: {profile.phoneNumber}</p>
            <p>DOB: {profile.dateOfBirth}</p>
            <p>Score: {profile.creditScore}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={`bank-app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <div className="header-content">
          <h1 className="bank-logo">JAVENGERS BANK | ADMIN PROFILE</h1>
          <div className="user-profile">
            <div className="user-avatar">A</div>
          </div>
        </div>
      </header>

      <div className="main-content">
        <nav className="sidebar">
          <ul className="nav-menu">
            <li className={activeView === 'transactions' ? 'active' : ''} onClick={() => setActiveView('transactions')}>
              <span className="nav-icon">{String.fromCodePoint(0x1f504)}</span>
              <span className="nav-text">Loans</span>
            </li>
            <li className={activeView === 'profile' ? 'active' : ''} onClick={() => setActiveView('profile')}>
              <span className="nav-icon">{String.fromCodePoint(0x1f464)}</span>
              <span className="nav-text">Profile</span>
            </li>
            <li className={activeView === 'allProfiles' ? 'active' : ''} onClick={() => setActiveView('allProfiles')}>
              <span className="nav-icon">{String.fromCodePoint(0x1f465)}</span>
              <span className="nav-text">All Profiles</span>
            </li>
            <li className={activeView === 'settings' ? 'active' : ''} onClick={() => setActiveView('settings')}>
              <span className="nav-icon">{String.fromCodePoint(0x2699)}</span>
              <span className="nav-text">Configuration</span>
            </li>
          </ul>
        </nav>

        <main className="content-area">
          {activeView === 'transactions' && <TransactionsView />}
          {activeView === 'profile' && <ProfileView />}
          {activeView === 'allProfiles' && <AllProfilesView />}
          {activeView === 'settings' && (
            <div className="view-content">
              <h2>Settings</h2>
              <div className="settings-options">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Login</h3>
                    <p>Log out session.</p>
                  </div>
                  <LogoutButton className="text-button" />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ManagerDashboard;
