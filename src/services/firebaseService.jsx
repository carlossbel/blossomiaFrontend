// src/services/firebaseService.js
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBuSyjuzRisUMa2U756VDXMCLM5CyIpfPM",
    authDomain: "blossomia-a1db4.firebaseapp.com",
    projectId: "blossomia-a1db4",
    storageBucket: "blossomia-a1db4.appstore.googleapis.com",
    messagingSenderId: "52460951190",
    appId: "1:52460951190:web:1b03a46be614d6a70514b7",
    measurementId: "G-MB1HHT0C8F"
};

// Variable para controlar si usamos Firebase o simulación
const USE_MOCK = true; // Cambia a false cuando resuelvas el problema de Firebase

// Objetos simulados para desarrollo
const mockUsers = {
  'user-123': {
    id: 'user-123',
    name: 'Usuario Ejemplo',
    email: 'usuario@ejemplo.com',
    password: 'Password123',
    telefono: '123456789',
    nivelExperiencia: 'Intermedio',
    tipoJardin: 'Interior',
    createdAt: '2023-01-01T00:00:00.000Z'
  }
};

let mockAuth = {
  currentUser: null
};

// Inicializar Firebase solo si no estamos usando mocks
let app;
let auth;
let db;

if (!USE_MOCK) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    console.log("Firebase inicializado correctamente");
  } catch (error) {
    console.error("Error al inicializar Firebase:", error);
  }
}

// Servicio de autenticación
const authService = {
  // Registrar un nuevo usuario
  register: async (userData) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const userId = 'user-' + Date.now();
          mockUsers[userId] = {
            id: userId,
            name: userData.name,
            email: userData.email,
            password: userData.password, // Nota: nunca almacenes contraseñas en texto plano en producción
            telefono: userData.telefono || '',
            nivelExperiencia: userData.nivelExperiencia || 'Principiante',
            tipoJardin: userData.tipoJardin || 'Interior',
            createdAt: new Date().toISOString()
          };
          
          console.log("Usuario simulado registrado:", mockUsers[userId]);
          
          resolve({
            success: true,
            user: {
              id: userId,
              name: userData.name,
              email: userData.email
            },
            qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/Blossomia:${userData.email}?secret=JBSWY3DPEHPK3PXP&issuer=Blossomia`
          });
        }, 1000);
      });
    }
    
    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const user = userCredential.user;
      
      // Actualizar el perfil con el nombre
      await updateProfile(user, {
        displayName: userData.name
      });
      
      // Guardar información adicional en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: userData.name,
        email: userData.email,
        telefono: userData.telefono || '',
        nivelExperiencia: userData.nivelExperiencia || 'Principiante',
        tipoJardin: userData.tipoJardin || 'Interior',
        createdAt: new Date().toISOString()
      });
      
      return {
        success: true,
        user: {
          id: user.uid,
          name: user.displayName,
          email: user.email
        },
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/Blossomia:${userData.email}?secret=JBSWY3DPEHPK3PXP&issuer=Blossomia`
      };
    } catch (error) {
      console.error("Error en registro:", error);
      
      let message = 'Error al registrar usuario';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Este correo electrónico ya está en uso';
      } else if (error.code === 'auth/weak-password') {
        message = 'La contraseña es demasiado débil';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Correo electrónico inválido';
      }
      
      throw { success: false, message };
    }
  },
  
  // Iniciar sesión
  login: async (credentials) => {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Buscar usuario por email
          const userFound = Object.values(mockUsers).find(user => 
            user.email === credentials.email && user.password === credentials.password
          );
          
          if (userFound) {
            // Simular autenticación exitosa
            mockAuth.currentUser = userFound;
            
            // Guardar token en localStorage
            const mockToken = 'mock-token-' + Date.now();
            localStorage.setItem('token', mockToken);
            localStorage.setItem('user', JSON.stringify({
              id: userFound.id,
              name: userFound.name,
              email: userFound.email,
              telefono: userFound.telefono,
              nivelExperiencia: userFound.nivelExperiencia,
              tipoJardin: userFound.tipoJardin
            }));
            
            resolve({
              success: true,
              requiresMfa: true,
              userId: userFound.id
            });
          } else {
            reject({ success: false, message: 'Credenciales inválidas' });
          }
        }, 1000);
      });
    }
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = userCredential.user;
      
      // Obtener datos adicionales de Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      
      // Guardar token y datos en localStorage
      localStorage.setItem('token', await user.getIdToken());
      localStorage.setItem('user', JSON.stringify({
        id: user.uid,
        name: userData?.name || user.displayName,
        email: user.email,
        telefono: userData?.telefono || '',
        nivelExperiencia: userData?.nivelExperiencia || 'Principiante',
        tipoJardin: userData?.tipoJardin || 'Interior'
      }));
      
      return {
        success: true,
        requiresMfa: true,
        userId: user.uid
      };
    } catch (error) {
      console.error("Error en login:", error);
      
      let message = 'Error al iniciar sesión';
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        message = 'Credenciales inválidas';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Demasiados intentos fallidos. Intenta más tarde';
      }
      
      throw { success: false, message };
    }
  },
  
  // Verificar código MFA (simulado)
  verifyMfa: async (userId, token) => {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Aceptar cualquier código de 6 dígitos para simulación
          if (token.length === 6 && /^\d+$/.test(token)) {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            resolve({
              success: true,
              user
            });
          } else {
            reject({ success: false, message: 'Código de verificación inválido' });
          }
        }, 1000);
      });
    }
    
    try {
      // En un caso real, aquí se verificaría el token con speakeasy
      // Para simplificar, aceptamos cualquier código de 6 dígitos
      if (token.length === 6 && /^\d+$/.test(token)) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return {
          success: true,
          user
        };
      } else {
        throw { success: false, message: 'Código de verificación inválido' };
      }
    } catch (error) {
      console.error("Error en verificación MFA:", error);
      throw { success: false, message: error.message || 'Error en verificación' };
    }
  },
  
  // Cerrar sesión
  logout: async () => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          mockAuth.currentUser = null;
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          resolve(true);
        }, 500);
      });
    }
    
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    } catch (error) {
      console.error("Error en logout:", error);
      return false;
    }
  },
  
  // Recuperación de contraseña
  forgotPassword: async (email) => {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Verificar si el email existe en nuestros usuarios simulados
          const userExists = Object.values(mockUsers).some(user => user.email === email);
          
          if (userExists) {
            resolve({ 
              success: true, 
              message: 'Se ha enviado un correo para restablecer tu contraseña' 
            });
          } else {
            // Simular éxito de todas formas (por seguridad)
            resolve({ 
              success: true, 
              message: 'Si el correo existe en nuestro sistema, recibirás instrucciones para restablecer tu contraseña' 
            });
          }
        }, 1000);
      });
    }
    
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: 'Se ha enviado un correo para restablecer tu contraseña' };
    } catch (error) {
      console.error("Error en recuperación de contraseña:", error);
      
      let message = 'Error al procesar la solicitud';
      if (error.code === 'auth/user-not-found') {
        message = 'No existe un usuario con este correo';
      }
      
      throw { success: false, message };
    }
  }
};

// Servicio de usuario
const userService = {
  // Obtener perfil del usuario
  getProfile: async (userId) => {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (mockUsers[userId]) {
            resolve({ 
              success: true, 
              user: {
                id: userId,
                name: mockUsers[userId].name,
                email: mockUsers[userId].email,
                telefono: mockUsers[userId].telefono,
                nivelExperiencia: mockUsers[userId].nivelExperiencia,
                tipoJardin: mockUsers[userId].tipoJardin
              } 
            });
          } else {
            reject({ success: false, message: 'Usuario no encontrado' });
          }
        }, 500);
      });
    }
    
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      
      if (userDoc.exists()) {
        return { success: true, user: userDoc.data() };
      } else {
        throw { success: false, message: 'Usuario no encontrado' };
      }
    } catch (error) {
      console.error("Error al obtener perfil:", error);
      throw error.message || 'Error al obtener perfil';
    }
  },
  
  // Actualizar perfil del usuario
  updateProfile: async (userId, userData) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Actualizar datos en nuestro mock
          if (mockUsers[userId]) {
            mockUsers[userId] = {
              ...mockUsers[userId],
              name: userData.name,
              telefono: userData.telefono || '',
              nivelExperiencia: userData.nivelExperiencia || 'Principiante',
              tipoJardin: userData.tipoJardin || 'Interior',
              updatedAt: new Date().toISOString()
            };
          }
          
          // Actualizar en localStorage
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          const updatedUser = {
            ...user,
            name: userData.name,
            telefono: userData.telefono,
            nivelExperiencia: userData.nivelExperiencia,
            tipoJardin: userData.tipoJardin
          };
          
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          resolve({
            success: true,
            user: updatedUser
          });
        }, 1000);
      });
    }
    
    try {
      // Actualizar datos en Firestore
      await updateDoc(doc(db, 'users', userId), {
        name: userData.name,
        telefono: userData.telefono || '',
        nivelExperiencia: userData.nivelExperiencia || 'Principiante',
        tipoJardin: userData.tipoJardin || 'Interior',
        updatedAt: new Date().toISOString()
      });
      
      // Actualizar en Authentication si cambió el nombre
      const currentUser = auth.currentUser;
      if (currentUser && userData.name) {
        await updateProfile(currentUser, {
          displayName: userData.name
        });
      }
      
      // Actualizar en localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({
        ...user,
        name: userData.name,
        telefono: userData.telefono,
        nivelExperiencia: userData.nivelExperiencia,
        tipoJardin: userData.tipoJardin
      }));
      
      return {
        success: true,
        user: {
          ...user,
          name: userData.name,
          telefono: userData.telefono,
          nivelExperiencia: userData.nivelExperiencia,
          tipoJardin: userData.tipoJardin
        }
      };
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      throw { success: false, message: error.message || 'Error al actualizar perfil' };
    }
  }
};

// Servicio de contacto
const contactoService = {
  // Enviar formulario de contacto
  enviarContacto: async (formData) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Mensaje de contacto simulado:", formData);
          resolve({
            success: true,
            message: 'Mensaje enviado correctamente'
          });
        }, 1000);
      });
    }
    
    try {
      // Guardar consulta en Firestore
      const contactRef = collection(db, 'contactos');
      await setDoc(doc(contactRef), {
        nombre: formData.nombre,
        email: formData.email,
        mensaje: formData.mensaje,
        tipoConsulta: formData.tipoConsulta,
        createdAt: new Date().toISOString(),
        estado: 'pendiente'
      });
      
      return {
        success: true,
        message: 'Mensaje enviado correctamente'
      };
    } catch (error) {
      console.error("Error al enviar contacto:", error);
      throw { success: false, message: error.message || 'Error al enviar el mensaje' };
    }
  }
};

export {
  authService,
  userService,
  contactoService,
  auth,
  db
};