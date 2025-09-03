export function signUp(email, password, fullName, mobile = '') { // Mobile is now optional
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return { error: 'User with this email already exists.' };
  }

  // Save the user data, including the optional mobile number
  users.push({ fullName, email, password, mobile });
  localStorage.setItem('users', JSON.stringify(users));

  return { success: true };
}

export function signIn(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email);

  if (!user || user.password !== password) {
    return { error: 'Invalid email or password.' };
  }
  
  const sessionData = {
    isLoggedIn: true,
    email: user.email,
    name: user.fullName || user.email.split('@')[0],
    mobile: user.mobile || '', // Add mobile to session if it exists
  };
  localStorage.setItem('currentUser', JSON.stringify(sessionData));

  return { success: true, user: sessionData };
}

export function updateUserProfile(currentEmail, updates) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  if (updates.email && updates.email !== currentEmail) {
    const emailExists = users.find(user => user.email === updates.email);
    if (emailExists) {
      return { error: "This email is already in use by another account." };
    }
  }

  let userUpdated = false;
  const updatedUsers = users.map(user => {
    if (user.email === currentEmail) {
      userUpdated = true;
      return { ...user, ...updates };
    }
    return user;
  });

  if (userUpdated) {
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.email === currentEmail) {
      const updatedSession = { 
          ...currentUser, 
          ...updates, 
          name: updates.fullName || currentUser.name 
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedSession));
    }
    return { success: true };
  }
  return { error: "User not found." };
}

export function signOut() {
  localStorage.removeItem('currentUser');
}

export function getCurrentUser() {
  const user = localStorage.getItem('currentUser');
  if (!user) return null;
  return JSON.parse(user);
}