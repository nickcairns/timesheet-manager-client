
import { useAuthStore } from '@/store/pinia'
import jwtDecode from 'jwt-decode'

function logout() {
  // Get access to the store
  const store = useAuthStore()

  // Clear the JWT token from Pinia
  store.setAuthToken(null)
  store.setUserId(null)
  store.setRole('GUEST')
}

function getUserRole() {
  // Get access to the store
  const store = useAuthStore()

  // Get the current user role from Pinia
  return store.role
}

function setUserRoleFromToken(token) {
  // Get access to the store
  const store = useAuthStore();
  console.log('Token:', token);
  // Decode the JWT token
  const decodedToken = jwtDecode(token);

  // Extract the user role from the decoded token
  const userRole = decodedToken.role;

  // Set the user role in the Pinia store
  store.setRole(userRole);
}

export {
  logout,
  getUserRole,
  setUserRoleFromToken
}