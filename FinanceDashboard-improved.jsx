import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import * as Icons from 'lucide-react';

// Système de traduction (identique au code original)
const translations = {
fr: {
// Header
title: 'Gestionnaire Financier Personnel',
income: 'Revenus',
userName: 'Nom d\'utilisateur',

// Navigation
dashboard: 'Tableau de bord',
budget: 'Budget',
expenses: 'Dépenses',
savings: 'Épargne',
calendar: 'Calendrier',
recurring: 'Récurrent',
debts: 'Dettes',
reports: 'Rapports',

// Dashboard
revenue: 'Revenus',
economy: 'Économies',
totalSavings: 'Épargne totale',
expenseDistribution: 'Répartition des dépenses',
expenseEvolution: 'Évolution des dépenses',
budgetOverview: 'Aperçu du budget',
remaining: 'restant',

// Categories
housing: 'Logement',
food: 'Alimentation',
transport: 'Transport',
leisure: 'Loisirs',
health: 'Santé',

// Common
add: 'Ajouter',
edit: 'Modifier',
delete: 'Supprimer',
save: 'Sauvegarder',
cancel: 'Annuler',
amount: 'Montant',
description: 'Description',
category: 'Catégorie',
date: 'Date',
month: 'Mois',
year: 'Année',
newCategory: 'Nouvelle catégorie',
monthlyBudget: 'Budget mensuel',
addExpense: 'Ajouter une dépense',
expenseHistory: 'Historique des dépenses',
noExpenses: 'Aucune dépense ce mois-ci',
newSavingsGoal: 'Nouvel objectif d\'épargne',
goalName: 'Nom de l\'objectif',
targetAmount: 'Montant cible',
deadline: 'Échéance',
create: 'Créer',
reached: 'atteint',
newRecurring: 'Nouvelle dépense récurrente',
dayOfMonth: 'Jour du mois (1-31)',
deductionDate: 'Date de prélèvement',
active: 'Actif',
inactive: 'Inactif',
monthlyRecurringTotal: 'Total mensuel récurrent',
newDebt: 'Nouvelle dette',
debtName: 'Nom de la dette',
currentBalance: 'Solde actuel',
minimumPayment: 'Paiement minimum',
interestRate: 'Taux d\'intérêt (%)',
balance: 'Solde',
minPayment: 'Paiement min',
rate: 'Taux',
recordPayment: 'Enregistrer un paiement',
totalDebts: 'Total des dettes',
monthlyMinPayments: 'Paiements mensuels min',
financialReports: 'Rapports financiers',
monthlyReport: 'Rapport mensuel',
detailedView: 'Vue détaillée de vos finances pour',
generateReport: 'Générer le rapport',
annualAnalysis: 'Analyse annuelle',
trends12Months: 'Tendances et projections sur 12 mois',
viewAnalysis: 'Voir l\'analyse',
modifyMonthlyIncome: 'Modifier les revenus mensuels',
monthlyIncome: 'Revenus mensuels',
language: 'Langue',
currency: 'Devise',
addCurrency: 'Ajouter une devise',
paymentHistory: 'Historique des paiements'
},
en: {
// Header
title: 'Personal Finance Manager',
income: 'Income',
userName: 'User Name',

// Navigation
dashboard: 'Dashboard',
budget: 'Budget',
expenses: 'Expenses',
savings: 'Savings',
calendar: 'Calendar',
recurring: 'Recurring',
debts: 'Debts',
reports: 'Reports',

// Dashboard
revenue: 'Revenue',
economy: 'Savings',
totalSavings: 'Total Savings',
expenseDistribution: 'Expense Distribution',
expenseEvolution: 'Expense Evolution',
budgetOverview: 'Budget Overview',
remaining: 'remaining',

// Categories
housing: 'Housing',
food: 'Food',
transport: 'Transport',
leisure: 'Leisure',
health: 'Health',

// Common
add: 'Add',
edit: 'Edit',
delete: 'Delete',
save: 'Save',
cancel: 'Cancel',
amount: 'Amount',
description: 'Description',
category: 'Category',
date: 'Date',
month: 'Month',
year: 'Year',
newCategory: 'New Category',
monthlyBudget: 'Monthly Budget',
addExpense: 'Add Expense',
expenseHistory: 'Expense History',
noExpenses: 'No expenses this month',
newSavingsGoal: 'New Savings Goal',
goalName: 'Goal Name',
targetAmount: 'Target Amount',
deadline: 'Deadline',
create: 'Create',
reached: 'reached',
newRecurring: 'New Recurring Expense',
dayOfMonth: 'Day of Month (1-31)',
deductionDate: 'Deduction Date',
active: 'Active',
inactive: 'Inactive',
monthlyRecurringTotal: 'Monthly Recurring Total',
newDebt: 'New Debt',
debtName: 'Debt Name',
currentBalance: 'Current Balance',
minimumPayment: 'Minimum Payment',
interestRate: 'Interest Rate (%)',
balance: 'Balance',
minPayment: 'Min Payment',
rate: 'Rate',
recordPayment: 'Record Payment',
totalDebts: 'Total Debts',
monthlyMinPayments: 'Monthly Min Payments',
financialReports: 'Financial Reports',
monthlyReport: 'Monthly Report',
detailedView: 'Detailed view of your finances for',
generateReport: 'Generate Report',
annualAnalysis: 'Annual Analysis',
trends12Months: 'Trends and projections over 12 months',
viewAnalysis: 'View Analysis',
modifyMonthlyIncome: 'Modify Monthly Income',
monthlyIncome: 'Monthly Income',
language: 'Language',
currency: 'Currency',
addCurrency: 'Add Currency',
paymentHistory: 'Payment History'
},
es: {
// Header
title: 'Gestor Financiero Personal',
income: 'Ingresos',
userName: 'Nombre de Usuario',

// Navigation
dashboard: 'Panel',
budget: 'Presupuesto',
expenses: 'Gastos',
savings: 'Ahorros',
calendar: 'Calendario',
recurring: 'Recurrente',
debts: 'Deudas',
reports: 'Informes',

// Dashboard
revenue: 'Ingresos',
economy: 'Ahorros',
totalSavings: 'Ahorros Totales',
expenseDistribution: 'Distribución de Gastos',
expenseEvolution: 'Evolución de Gastos',
budgetOverview: 'Resumen del Presupuesto',
remaining: 'restante',

// Categories
housing: 'Vivienda',
food: 'Alimentación',
transport: 'Transporte',
leisure: 'Ocio',
health: 'Salud',

// Common
add: 'Añadir',
edit: 'Editar',
delete: 'Eliminar',
save: 'Guardar',
cancel: 'Cancelar',
amount: 'Cantidad',
description: 'Descripción',
category: 'Categoría',
date: 'Fecha',
month: 'Mes',
year: 'Año',
newCategory: 'Nueva Categoría',
monthlyBudget: 'Presupuesto Mensual',
addExpense: 'Añadir Gasto',
expenseHistory: 'Historial de Gastos',
noExpenses: 'No hay gastos este mes',
newSavingsGoal: 'Nuevo Objetivo de Ahorro',
goalName: 'Nombre del Objetivo',
targetAmount: 'Cantidad Objetivo',
deadline: 'Fecha Límite',
create: 'Crear',
reached: 'alcanzado',
newRecurring: 'Nuevo Gasto Recurrente',
dayOfMonth: 'Día del Mes (1-31)',
deductionDate: 'Fecha de Deducción',
active: 'Activo',
inactive: 'Inactivo',
monthlyRecurringTotal: 'Total Mensual Recurrente',
newDebt: 'Nueva Deuda',
debtName: 'Nombre de la Deuda',
currentBalance: 'Saldo Actual',
minimumPayment: 'Pago Mínimo',
interestRate: 'Tasa de Interés (%)',
balance: 'Saldo',
minPayment: 'Pago Mín',
rate: 'Tasa',
recordPayment: 'Registrar Pago',
totalDebts: 'Total de Deudas',
monthlyMinPayments: 'Pagos Mínimos Mensuales',
financialReports: 'Informes Financieros',
monthlyReport: 'Informe Mensual',
detailedView: 'Vista detallada de sus finanzas para',
generateReport: 'Generar Informe',
annualAnalysis: 'Análisis Anual',
trends12Months: 'Tendencias y proyecciones de 12 meses',
viewAnalysis: 'Ver Análisis',
modifyMonthlyIncome: 'Modificar Ingresos Mensuales',
monthlyIncome: 'Ingresos Mensuales',
language: 'Idioma',
currency: 'Moneda',
addCurrency: 'Añadir Moneda',
paymentHistory: 'Historial de Pagos'
},
de: {
// Header
title: 'Persönlicher Finanzmanager',
income: 'Einkommen',
userName: 'Benutzername',

// Navigation
dashboard: 'Dashboard',
budget: 'Budget',
expenses: 'Ausgaben',
savings: 'Sparen',
calendar: 'Kalender',
recurring: 'Wiederkehrend',
debts: 'Schulden',
reports: 'Berichte',

// Dashboard
revenue: 'Einnahmen',
economy: 'Ersparnisse',
totalSavings: 'Gesamte Ersparnisse',
expenseDistribution: 'Ausgabenverteilung',
expenseEvolution: 'Ausgabenentwicklung',
budgetOverview: 'Budget-Übersicht',
remaining: 'übrig',

// Categories
housing: 'Wohnen',
food: 'Lebensmittel',
transport: 'Transport',
leisure: 'Freizeit',
health: 'Gesundheit',

// Common
add: 'Hinzufügen',
edit: 'Bearbeiten',
delete: 'Löschen',
save: 'Speichern',
cancel: 'Abbrechen',
amount: 'Betrag',
description: 'Beschreibung',
category: 'Kategorie',
date: 'Datum',
month: 'Monat',
year: 'Jahr',
newCategory: 'Neue Kategorie',
monthlyBudget: 'Monatsbudget',
addExpense: 'Ausgabe hinzufügen',
expenseHistory: 'Ausgabenhistorie',
noExpenses: 'Keine Ausgaben in diesem Monat',
newSavingsGoal: 'Neues Sparziel',
goalName: 'Name des Ziels',
targetAmount: 'Zielbetrag',
deadline: 'Fristablauf',
create: 'Erstellen',
reached: 'erreicht',
newRecurring: 'Neue wiederkehrende Ausgabe',
dayOfMonth: 'Tag des Monats (1-31)',
deductionDate: 'Abzugsdatum',
active: 'Aktiv',
inactive: 'Inaktiv',
monthlyRecurringTotal: 'Monatlicher wiederkehrender Gesamtbetrag',
newDebt: 'Neue Schuld',
debtName: 'Name der Schuld',
currentBalance: 'Aktueller Saldo',
minimumPayment: 'Mindestzahlung',
interestRate: 'Zinssatz (%)',
balance: 'Saldo',
minPayment: 'Min. Zahlung',
rate: 'Satz',
recordPayment: 'Zahlung erfassen',
totalDebts: 'Gesamtschulden',
monthlyMinPayments: 'Monatliche Mindestzahlungen',
financialReports: 'Finanzberichte',
monthlyReport: 'Monatsbericht',
detailedView: 'Detaillierte Ansicht Ihrer Finanzen für',
generateReport: 'Bericht erstellen',
annualAnalysis: 'Jahresanalyse',
trends12Months: 'Trends und Prognosen über 12 Monate',
viewAnalysis: 'Analyse anzeigen',
modifyMonthlyIncome: 'Monatliches Einkommen ändern',
monthlyIncome: 'Monatliches Einkommen',
language: 'Sprache',
currency: 'Währung',
addCurrency: 'Währung hinzufügen',
paymentHistory: 'Zahlungshistorie'
},
ar: {
// Header
title: 'مدير الشؤون المالية الشخصية',
income: 'الدخل',
userName: 'اسم المستخدم',

// Navigation
dashboard: 'لوحة التحكم',
budget: 'الميزانية',
expenses: 'المصروفات',
savings: 'المدخرات',
calendar: 'التقويم',
recurring: 'متكرر',
debts: 'الديون',
reports: 'التقارير',

// Dashboard
revenue: 'الإيرادات',
economy: 'المدخرات',
totalSavings: 'إجمالي المدخرات',
expenseDistribution: 'توزيع المصروفات',
expenseEvolution: 'تطور المصروفات',
budgetOverview: 'نظرة عامة على الميزانية',
remaining: 'متبقي',

// Categories
housing: 'السكن',
food: 'الطعام',
transport: 'النقل',
leisure: 'الترفيه',
health: 'الصحة',

// Common
add: 'إضافة',
edit: 'تعديل',
delete: 'حذف',
save: 'حفظ',
cancel: 'إلغاء',
amount: 'المبلغ',
description: 'الوصف',
category: 'الفئة',
date: 'التاريخ',
month: 'الشهر',
year: 'السنة',
newCategory: 'فئة جديدة',
monthlyBudget: 'الميزانية الشهرية',
addExpense: 'إضافة مصروف',
expenseHistory: 'تاريخ المصروفات',
noExpenses: 'لا توجد مصروفات هذا الشهر',
newSavingsGoal: 'هدف ادخار جديد',
goalName: 'اسم الهدف',
targetAmount: 'المبلغ المستهدف',
deadline: 'الموعد النهائي',
create: 'إنشاء',
reached: 'تم الوصول',
newRecurring: 'مصروف متكرر جديد',
dayOfMonth: 'يوم من الشهر (1-31)',
deductionDate: 'تاريخ الخصم',
active: 'نشط',
inactive: 'غير نشط',
monthlyRecurringTotal: 'إجمالي المصروفات المتكررة الشهرية',
newDebt: 'دين جديد',
debtName: 'اسم الدين',
currentBalance: 'الرصيد الحالي',
minimumPayment: 'الحد الأدنى للدفع',
interestRate: 'معدل الفائدة (%)',
balance: 'الرصيد',
minPayment: 'الحد الأدنى للدفع',
rate: 'المعدل',
recordPayment: 'تسجيل دفع',
totalDebts: 'إجمالي الديون',
monthlyMinPayments: 'الحد الأدنى للمدفوعات الشهرية',
financialReports: 'التقارير المالية',
monthlyReport: 'التقرير الشهري',
detailedView: 'عرض تفصيلي لأموالك لشهر',
generateReport: 'إنتاج التقرير',
annualAnalysis: 'التحليل السنوي',
trends12Months: 'الاتجاهات والتوقعات على مدى 12 شهرًا',
viewAnalysis: 'عرض التحليل',
modifyMonthlyIncome: 'تعديل الدخل الشهري',
monthlyIncome: 'الدخل الشهري',
language: 'اللغة',
currency: 'العملة',
addCurrency: 'إضافة عملة',
paymentHistory: 'تاريخ المدفوعات'
}
};

const FinanceDashboard = () => {
// Configuration initiale avec langue et devises
const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'fr');
const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
const [showBalances, setShowBalances] = useState(true);
const [activeTab, setActiveTab] = useState('dashboard');
const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
const [notifications, setNotifications] = useState([]);
const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '');

// Helper pour les traductions
const t = (key) => translations[language]?.[key] || translations.fr[key] || key;

// Système de devises
const [currencies, setCurrencies] = useState(() => {
const saved = localStorage.getItem('currencies');
return saved ? JSON.parse(saved) : [
{ code: 'EUR', symbol: '€', name: 'Euro' },
{ code: 'USD', symbol: '$', name: 'Dollar américain' }
];
});

const [selectedCurrency, setSelectedCurrency] = useState(() => {
return localStorage.getItem('selectedCurrency') || 'EUR';
});

const getCurrentCurrency = () => currencies.find(c => c.code === selectedCurrency) || currencies[0];

// Revenus modifiables
const [monthlyIncome, setMonthlyIncome] = useState(() => {
const saved = localStorage.getItem('monthlyIncome');
return saved ? parseFloat(saved) : 3500;
});

// État pour les modals
const [showIncomeModal, setShowIncomeModal] = useState(false);
const [showSavingsModal, setShowSavingsModal] = useState(false);
const [showRecurringModal, setShowRecurringModal] = useState(false);
const [showDebtModal, setShowDebtModal] = useState(false);
const [showCurrencyModal, setShowCurrencyModal] = useState(false);
const [editingItem, setEditingItem] = useState(null);

// Données principales avec nouvelles catégories traduites
const [categories, setCategories] = useState(() => {
const saved = localStorage.getItem('categories');
return saved ? JSON.parse(saved) : [
{ id: 1, name: t('housing'), budget: 1200, spent: 1200, color: '#3B82F6' },
{ id: 2, name: t('food'), budget: 400, spent: 320, color: '#10B981' },
{ id: 3, name: t('transport'), budget: 300, spent: 280, color: '#8B5CF6' },
{ id: 4, name: t('leisure'), budget: 200, spent: 150, color: '#EC4899' },
{ id: 5, name: t('health'), budget: 150, spent: 80, color: '#EF4444' }
];
});

const [expenses, setExpenses] = useState(() => {
const saved = localStorage.getItem('expenses');
return saved ? JSON.parse(saved) : [
{ id: 1, date: '2024-12-28', category: t('food'), amount: 45.50, description: 'Courses Carrefour' },
{ id: 2, date: '2024-12-27', category: t('transport'), amount: 12.80, description: 'Métro' },
{ id: 3, date: '2024-12-26', category: t('leisure'), amount: 35.00, description: 'Cinéma' }
];
});

const [savingsGoals, setSavingsGoals] = useState(() => {
const saved = localStorage.getItem('savingsGoals');
return saved ? JSON.parse(saved) : [
{
id: 1,
name: 'Vacances',
target: 3000,
current: 1250,
color: '#3B82F6',
deadline: '2025-12-31',
operations: [
{ id: 1, date: '2024-01-15', amount: 500, type: 'deposit', description: 'Dépôt initial' },
{ id: 2, date: '2024-02-15', amount: 250, type: 'deposit', description: 'Épargne mensuelle' },
{ id: 3, date: '2024-03-15', amount: 250, type: 'deposit', description: 'Épargne mensuelle' },
{ id: 4, date: '2024-04-15', amount: 250, type: 'deposit', description: 'Épargne mensuelle' }
]
},
{
id: 2,
name: 'Urgence',
target: 10000,
current: 4500,
color: '#10B981',
deadline: '2026-12-31',
operations: [
{ id: 1, date: '2024-01-01', amount: 2000, type: 'deposit', description: 'Fonds de démarrage' },
{ id: 2, date: '2024-02-01', amount: 500, type: 'deposit', description: 'Épargne mensuelle' },
{ id: 3, date: '2024-03-01', amount: 500, type: 'deposit', description: 'Épargne mensuelle' },
{ id: 4, date: '2024-04-01', amount: 500, type: 'deposit', description: 'Épargne mensuelle' },
{ id: 5, date: '2024-05-01', amount: 500, type: 'deposit', description: 'Épargne mensuelle' },
{ id: 6, date: '2024-06-01', amount: 500, type: 'deposit', description: 'Épargne mensuelle' }
]
}
];
});

const [recurringExpenses, setRecurringExpenses] = useState(() => {
const saved = localStorage.getItem('recurringExpenses');
return saved ? JSON.parse(saved) : [
{ id: 1, name: 'Loyer', amount: 1200, day: 1, category: t('housing'), active: true, deductionDate: '01/01' },
{ id: 2, name: 'Netflix', amount: 13.99, day: 5, category: t('leisure'), active: true, deductionDate: '05/01' },
{ id: 3, name: 'Assurance', amount: 85, day: 15, category: t('transport'), active: true, deductionDate: '15/01' }
];
});

const [debts, setDebts] = useState(() => {
const saved = localStorage.getItem('debts');
return saved ? JSON.parse(saved) : [
{
id: 1,
name: 'Carte crédit',
balance: 2500,
minPayment: 75,
rate: 18.9,
type: 'credit_card',
paymentHistory: []
},
{
id: 2,
name: 'Prêt auto',
balance: 12000,
minPayment: 320,
rate: 4.5,
type: 'auto_loan',
paymentHistory: []
}
];
});

const [newExpense, setNewExpense] = useState({
date: new Date().toISOString().split('T')[0],
category: '',
amount: '',
description: ''
});

const [newCategory, setNewCategory] = useState({ name: '', budget: '' });
const [showCategoryForm, setShowCategoryForm] = useState(false);

// Sauvegarde automatique (identique au code original)
useEffect(() => {
localStorage.setItem('language', language);
}, [language]);

useEffect(() => {
localStorage.setItem('currencies', JSON.stringify(currencies));
}, [currencies]);

useEffect(() => {
localStorage.setItem('selectedCurrency', selectedCurrency);
}, [selectedCurrency]);

useEffect(() => {
localStorage.setItem('categories', JSON.stringify(categories));
}, [categories]);

useEffect(() => {
localStorage.setItem('expenses', JSON.stringify(expenses));
}, [expenses]);

useEffect(() => {
localStorage.setItem('savingsGoals', JSON.stringify(savingsGoals));
}, [savingsGoals]);

useEffect(() => {
localStorage.setItem('recurringExpenses', JSON.stringify(recurringExpenses));
}, [recurringExpenses]);

useEffect(() => {
localStorage.setItem('debts', JSON.stringify(debts));
}, [debts]);

useEffect(() => {
localStorage.setItem('monthlyIncome', monthlyIncome.toString());
}, [monthlyIncome]);

useEffect(() => {
localStorage.setItem('userName', userName);
}, [userName]);

useEffect(() => {
localStorage.setItem('darkMode', darkMode);
if (darkMode) {
document.documentElement.classList.add('dark');
} else {
document.documentElement.classList.remove('dark');
}
}, [darkMode]);

// Support RTL pour l'arabe
useEffect(() => {
if (language === 'ar') {
document.dir = 'rtl';
document.documentElement.style.direction = 'rtl';
} else {
document.dir = 'ltr';
document.documentElement.style.direction = 'ltr';
}
}, [language]);

// Initialisation de la catégorie par défaut dans newExpense
useEffect(() => {
if (categories.length > 0 && !newExpense.category) {
setNewExpense(prev => ({ ...prev, category: categories[0].name }));
}
}, [categories]);

// Calculs avec revenus dynamiques
const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
const totalSpent = useMemo(() => {
const monthExpenses = expenses.filter(e => e.date.startsWith(selectedMonth));
const spent = {};

monthExpenses.forEach(expense => {
if (!spent[expense.category]) spent[expense.category] = 0;
spent[expense.category] += expense.amount;
});

return categories.reduce((sum, cat) => sum + (spent[cat.name] || 0), 0);
}, [expenses, categories, selectedMonth]);

const totalSavings = savingsGoals.reduce((sum, goal) => sum + goal.current, 0);
const totalRecurring = recurringExpenses.filter(e => e.active).reduce((sum, exp) => sum + exp.amount, 0);
const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);

// Données pour graphiques
const monthlyData = useMemo(() => {
const monthExpenses = expenses.filter(e => e.date.startsWith(selectedMonth));
const data = {};

monthExpenses.forEach(expense => {
if (!data[expense.category]) data[expense.category] = 0;
data[expense.category] += expense.amount;
});

return categories.map(cat => ({
name: cat.name,
spent: data[cat.name] || 0,
budget: cat.budget
}));
}, [expenses, categories, selectedMonth]);

const spendingTrend = useMemo(() => {
const months = [];
const today = new Date();

for (let i = 5; i >= 0; i--) {
const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
const monthStr = date.toISOString().slice(0, 7);
const monthExpenses = expenses.filter(e => e.date.startsWith(monthStr));
const total = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

months.push({
month: date.toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'de' ? 'de-DE' : 'fr-FR', { month: 'short' }),
amount: total
});
}

return months;
}, [expenses, language]);

// Pie chart data pour la répartition des dépenses
const pieChartData = useMemo(() => {
const monthExpenses = expenses.filter(e => e.date.startsWith(selectedMonth));
const data = {};

monthExpenses.forEach(expense => {
if (!data[expense.category]) data[expense.category] = 0;
data[expense.category] += expense.amount;
});

return Object.keys(data).map(categoryName => {
const category = categories.find(cat => cat.name === categoryName);
return {
name: categoryName,
value: data[categoryName],
color: category?.color || '#888888'
};
});
}, [expenses, categories, selectedMonth]);

// Fonction pour calculer les suggestions d'épargne - CORRIGÉE POUR DATE EXACTE
const calculateSavingsProjections = (goal) => {
const remainingAmount = goal.target - goal.current;
const today = new Date();
const deadline = new Date(goal.deadline);

// Calcul exact des mois restants jusqu'à l'échéance
const yearsDiff = deadline.getFullYear() - today.getFullYear();
const monthsDiff = deadline.getMonth() - today.getMonth();
const daysDiff = deadline.getDate() - today.getDate();

let monthsRemaining = yearsDiff * 12 + monthsDiff;
if (daysDiff < 0) {
monthsRemaining -= 1;
}
monthsRemaining = Math.max(1, monthsRemaining);

// Si l'objectif est déjà atteint
if (remainingAmount <= 0) {
return [{ 
amount: 0, 
label: 'Objectif déjà atteint! 🎉', 
monthsToGoal: 0, 
achievementDate: 'Maintenant', 
beforeDeadline: true 
}];
}

const monthlyNeeded = remainingAmount / monthsRemaining;

// Scénarios de projection avec date d'échéance exacte
const scenarios = [
{ amount: 50, label: '50€/mois' },
{ amount: 100, label: '100€/mois' },
{ amount: 200, label: '200€/mois' },
{ amount: Math.ceil(monthlyNeeded), label: `${Math.ceil(monthlyNeeded)}€/mois (pour atteindre exactement à l'échéance)` }
].filter(scenario => scenario.amount > 0);

return scenarios.map(scenario => {
const monthsToGoal = Math.ceil(remainingAmount / scenario.amount);
const achievementDate = new Date(today);
achievementDate.setMonth(achievementDate.getMonth() + monthsToGoal);

// Comparaison exacte avec la deadline
const beforeDeadline = achievementDate <= deadline;
const exactlyOnTime = Math.abs(achievementDate.getTime() - deadline.getTime()) < 86400000; // 1 jour de marge

return {
...scenario,
monthsToGoal: beforeDeadline ? monthsToGoal : monthsRemaining,
achievementDate: beforeDeadline ? 
achievementDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) :
deadline.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
beforeDeadline,
exactlyOnTime,
achievableAmount: beforeDeadline ? remainingAmount : (scenario.amount * monthsRemaining),
note: beforeDeadline ? 
(exactlyOnTime ? 'Parfait timing! 🎯' : 'Objectif atteint en avance! 🚀') : 
`Seulement ${(scenario.amount * monthsRemaining).toFixed(0)}€ atteignables à l'échéance`
};
});
};

// Notifications
const showNotification = (message, type = 'success') => {
const id = Date.now();
setNotifications(prev => [...prev, { id, message, type }]);
setTimeout(() => {
setNotifications(prev => prev.filter(n => n.id !== id));
}, 3000);
};

// Fonctions CRUD principales (simplifiées pour ce fichier)
const addExpense = () => {
const amount = parseFloat(newExpense.amount);
if (!amount || !newExpense.description || !newExpense.category) {
showNotification('Veuillez remplir tous les champs', 'error');
return;
}

const expense = {
id: Date.now(),
...newExpense,
amount
};

setExpenses(prevExpenses => [...prevExpenses, expense]);

setNewExpense({
date: new Date().toISOString().split('T')[0],
category: categories.length > 0 ? categories[0].name : '',
amount: '',
description: ''
});

showNotification('Dépense ajoutée avec succès');
};

const addCategory = () => {
const budget = parseFloat(newCategory.budget);
if (!newCategory.name || !budget) {
showNotification('Veuillez remplir tous les champs', 'error');
return;
}

const category = {
id: Date.now(),
name: newCategory.name,
budget: budget,
spent: 0,
color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`
};

setCategories([...categories, category]);
setNewCategory({ name: '', budget: '' });
setShowCategoryForm(false);
showNotification('Catégorie ajoutée');
};

const addSavingsGoal = (goal) => {
const newGoal = {
id: Date.now(),
...goal,
current: 0,
operations: [],
color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`
};
setSavingsGoals([...savingsGoals, newGoal]);
setShowSavingsModal(false);
showNotification('Objectif d\'épargne créé');
};

const updateSavingsGoal = (id, amount, description = '') => {
setSavingsGoals(goals =>
goals.map(goal => {
if (goal.id === id) {
const newOperation = {
id: Date.now(),
date: new Date().toISOString().split('T')[0],
amount: Math.abs(amount),
type: amount > 0 ? 'deposit' : 'withdrawal',
description: description || (amount > 0 ? 'Dépôt' : 'Retrait')
};

const newCurrent = Math.max(0, Math.min(goal.current + amount, goal.target));
const newOperations = [...(goal.operations || []), newOperation];

return {
...goal,
current: newCurrent,
operations: newOperations
};
}
return goal;
})
);
showNotification('Objectif mis à jour');
};

// Styles responsives améliorés avec meilleur contraste
const theme = {
bg: darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100',
card: darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900 shadow-lg',
text: darkMode ? 'text-white' : 'text-gray-900',
textSecondary: darkMode ? 'text-gray-300' : 'text-gray-600',
border: darkMode ? 'border-gray-700' : 'border-gray-200',
input: darkMode ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500',
button: {
primary: darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white',
secondary: darkMode ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-500 hover:bg-gray-600 text-white',
success: darkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white',
danger: darkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
}
};

// Tabs configuration
const tabs = [
{ id: 'dashboard', name: t('dashboard'), icon: Icons.Home },
{ id: 'budget', name: t('budget'), icon: Icons.Target },
{ id: 'expenses', name: t('expenses'), icon: Icons.CreditCard },
{ id: 'savings', name: t('savings'), icon: Icons.PiggyBank },
{ id: 'calendar', name: t('calendar'), icon: Icons.Calendar },
{ id: 'recurring', name: t('recurring'), icon: Icons.RefreshCw },
{ id: 'debts', name: t('debts'), icon: Icons.AlertCircle },
{ id: 'reports', name: t('reports'), icon: Icons.FileText }
];

return (
<div className={`min-h-screen ${theme.bg}`}>
{/* Notifications */}
<div className="fixed top-4 right-4 z-50 space-y-2">
{notifications.map(notif => (
<div
key={notif.id}
className={`px-4 py-2 rounded-lg shadow-lg text-white flex items-center ${
notif.type === 'error' ? 'bg-red-500' : 'bg-green-500'
}`}
>
<Icons.CheckCircle className="h-5 w-5 mr-2" />
{notif.message}
</div>
))}
</div>

{/* Header - Design professionnel amélioré */}
<header className={`${theme.card} shadow-xl border-b ${theme.border} bg-gradient-to-r ${darkMode ? 'from-gray-900 via-gray-800 to-gray-900' : 'from-white via-gray-50 to-white'}`}>
<div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
{/* Ligne principale */}
<div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
{/* Section titre et utilisateur */}
<div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-6">
<div className="flex items-center space-x-3">
<div className="relative">
<div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
<Icons.TrendingUp className="h-7 w-7 text-white" />
</div>
<div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
</div>
<div>
<h1 className={`text-xl sm:text-2xl font-bold ${theme.text} leading-tight`}>
<span className="hidden lg:inline">{t('title')}</span>
<span className="lg:hidden">Finance Pro</span>
</h1>
<p className={`text-sm ${theme.textSecondary}`}>
Tableau de bord personnel
</p>
</div>
</div>

{/* Section utilisateur */}
<div className="flex items-center space-x-3">
<div className={`flex items-center space-x-2 px-4 py-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl border ${theme.border}`}>
<Icons.User className="h-4 w-4 text-indigo-600" />
<input
type="text"
value={userName}
onChange={(e) => setUserName(e.target.value)}
placeholder={t('userName')}
className={`bg-transparent border-none outline-none text-sm ${theme.text} placeholder-gray-400 w-28 sm:w-32`}
/>
</div>
{userName && (
<div className={`px-3 py-1 ${darkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'} rounded-lg border border-indigo-200 dark:border-indigo-700`}>
<p className={`text-xs font-medium ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
Bonjour, {userName}! 👋
</p>
</div>
)}
</div>
</div>

{/* Section contrôles */}
<div className="flex flex-wrap items-center gap-3">
{/* Sélecteurs de langue et devise */}
<div className="flex items-center space-x-2">
<div className="flex items-center space-x-1">
<Icons.Globe className="h-4 w-4 text-gray-500" />
<select
value={language}
onChange={(e) => setLanguage(e.target.value)}
className={`px-3 py-2 border rounded-lg text-sm font-medium ${theme.input} min-w-[120px] cursor-pointer transition-all hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200`}
>
<option value="fr">🇫🇷 Français</option>
<option value="en">🇺🇸 English</option>
<option value="es">🇪🇸 Español</option>
<option value="de">🇩🇪 Deutsch</option>
<option value="ar">🇸🇦 العربية</option>
</select>
</div>

<div className="flex items-center space-x-1">
<Icons.DollarSign className="h-4 w-4 text-gray-500" />
<select
value={selectedCurrency}
onChange={(e) => setSelectedCurrency(e.target.value)}
className={`px-3 py-2 border rounded-lg text-sm font-medium ${theme.input} min-w-[100px] cursor-pointer transition-all hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200`}
>
{currencies.map(currency => (
<option key={currency.code} value={currency.code}>
{currency.symbol} {currency.code}
</option>
))}
</select>
</div>

<button
onClick={() => setShowCurrencyModal(true)}
className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all transform hover:scale-105"
title="Ajouter une devise"
>
<Icons.Plus className="h-4 w-4" />
</button>
</div>

{/* Revenus mensuels */}
<button
onClick={() => setShowIncomeModal(true)}
className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 hover:shadow-xl"
>
<div className="flex items-center space-x-2">
<Icons.Wallet className="h-4 w-4" />
<div className="text-left">
<p className="text-xs opacity-90">{t('income')}</p>
<p className="text-sm font-bold">
{showBalances ? `${monthlyIncome.toLocaleString()}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}
</p>
</div>
<Icons.Edit2 className="h-3 w-3 opacity-75" />
</div>
</button>

{/* Contrôles d'affichage */}
<div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
<button
onClick={() => setDarkMode(!darkMode)}
className={`p-2 rounded-md transition-all ${darkMode ? 'bg-gray-600 text-yellow-400' : 'bg-white text-gray-600 shadow-sm'}`}
title={darkMode ? 'Mode clair' : 'Mode sombre'}
>
{darkMode ? <Icons.Sun className="h-4 w-4" /> : <Icons.Moon className="h-4 w-4" />}
</button>

<button
onClick={() => setShowBalances(!showBalances)}
className={`p-2 rounded-md transition-all ${!showBalances ? 'bg-gray-600 text-blue-400' : 'bg-white text-gray-600 shadow-sm'}`}
title={showBalances ? 'Masquer les montants' : 'Afficher les montants'}
>
{showBalances ? <Icons.Eye className="h-4 w-4" /> : <Icons.EyeOff className="h-4 w-4" />}
</button>
</div>
</div>
</div>
</div>
</header>

{/* Navigation - Mobile responsive */}
<nav className={`${theme.card} shadow-sm`}>
<div className="max-w-7xl mx-auto px-2 sm:px-4">
<div className="flex space-x-2 sm:space-x-8 overflow-x-auto scrollbar-hide">
{tabs.map(tab => {
const Icon = tab.icon;
return (
<button
key={tab.id}
onClick={() => setActiveTab(tab.id)}
className={`flex flex-col sm:flex-row items-center px-2 sm:px-3 py-2 sm:py-4 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap min-w-max transition-colors ${
activeTab === tab.id
? 'border-blue-500 text-blue-600'
: `border-transparent ${theme.textSecondary} hover:text-blue-500`
}`}
>
<Icon className="h-4 w-4 sm:h-4 sm:w-4 sm:mr-2 mb-1 sm:mb-0" />
<span className="text-xs sm:text-sm">{tab.name}</span>
</button>
);
})}
</div>
</div>
</nav>

{/* Main Content */}
<main className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
{/* Suite du code avec les sections améliorées... */}
{activeTab === 'dashboard' && (
<div>Dashboard Content - À implémenter avec graphiques</div>
)}

{activeTab === 'budget' && (
<div>Budget Content Amélioré - À implémenter</div>
)}

{activeTab === 'expenses' && (
<div>Expenses Content avec Graphiques - À implémenter</div>
)}

{/* SECTION ÉPARGNE AMÉLIORÉE - Sans progression moyenne */}
{activeTab === 'savings' && (
<div className="space-y-6">
{/* Header avec design moderne */}
<div className={`${theme.card} rounded-xl p-6 border ${theme.border} shadow-xl bg-gradient-to-r ${darkMode ? 'from-gray-800 to-gray-700' : 'from-white to-gray-50'}`}>
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
<div>
<h2 className={`text-2xl font-bold ${theme.text} flex items-center`}>
<Icons.PiggyBank className="h-7 w-7 mr-3 text-green-600" />
Gestion de l'{t('savings').toLowerCase()}
</h2>
<p className={`text-sm ${theme.textSecondary} mt-2`}>
Définissez et suivez vos objectifs d'épargne avec des projections intelligentes
</p>
</div>
<button
onClick={() => setShowSavingsModal(true)}
className={`px-6 py-3 rounded-xl transition-all transform hover:scale-105 ${theme.button.primary} shadow-lg flex items-center justify-center`}
>
<Icons.PlusCircle className="h-5 w-5 mr-2" />
{t('newSavingsGoal')}
</button>
</div>
</div>

{/* Stats de l'épargne - SUPPRESSION DE LA PROGRESSION MOYENNE */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
<div className={`${darkMode ? 'bg-gradient-to-br from-green-900 to-green-800' : 'bg-gradient-to-br from-green-50 to-green-100'} p-6 rounded-xl border ${theme.border} shadow-lg`}>
<div className="flex items-center justify-between">
<div>
<p className={`text-sm font-medium ${darkMode ? 'text-green-200' : 'text-green-800'}`}>Épargne totale</p>
<p className={`text-2xl font-bold ${darkMode ? 'text-green-100' : 'text-green-900'}`}>
{showBalances ? `${totalSavings.toLocaleString()}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}
</p>
</div>
<Icons.Wallet className={`h-8 w-8 ${darkMode ? 'text-green-300' : 'text-green-600'}`} />
</div>
</div>

<div className={`${darkMode ? 'bg-gradient-to-br from-blue-900 to-blue-800' : 'bg-gradient-to-br from-blue-50 to-blue-100'} p-6 rounded-xl border ${theme.border} shadow-lg`}>
<div className="flex items-center justify-between">
<div>
<p className={`text-sm font-medium ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>Objectifs actifs</p>
<p className={`text-2xl font-bold ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
{savingsGoals.length}
</p>
</div>
<Icons.Target className={`h-8 w-8 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
</div>
</div>
</div>

{/* Graphique de progression des objectifs - NOUVEAU */}
<div className={`${theme.card} rounded-xl p-6 border ${theme.border} shadow-xl`}>
<h3 className={`text-lg font-semibold mb-6 ${theme.text} flex items-center`}>
<Icons.BarChart3 className="h-5 w-5 mr-2" />
Progression de vos objectifs d'épargne
</h3>
<div className="h-80">
<ResponsiveContainer width="100%" height="100%">
<BarChart 
data={savingsGoals.map(goal => ({
name: goal.name,
current: goal.current,
target: goal.target,
percentage: (goal.current / goal.target) * 100
}))} 
margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
>
<CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
<XAxis dataKey="name" tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }} />
<YAxis tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }} />
<Tooltip formatter={(value) => `${value.toFixed(2)}${getCurrentCurrency().symbol}`} />
<Bar dataKey="current" fill="#10B981" name="Montant actuel" radius={[4, 4, 0, 0]} />
<Bar dataKey="target" fill="#3B82F6" name="Objectif" radius={[4, 4, 0, 0]} opacity={0.3} />
</BarChart>
</ResponsiveContainer>
</div>
</div>

{/* Liste des objectifs d'épargne avec projections corrigées */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
{savingsGoals.map(goal => {
const percentage = (goal.current / goal.target) * 100;
const projections = calculateSavingsProjections(goal);
const recentOperations = (goal.operations || []).slice(-5).reverse();

return (
<div key={goal.id} className={`${theme.card} rounded-xl p-6 border ${theme.border} shadow-xl overflow-hidden`}>
{/* En-tête de l'objectif */}
<div className="flex justify-between items-start mb-4">
<div className="flex items-center space-x-3">
<div className={`w-12 h-12 rounded-full flex items-center justify-center`} style={{backgroundColor: goal.color + '20'}}>
<Icons.PiggyBank className="h-6 w-6" style={{color: goal.color}} />
</div>
<div>
<h3 className={`font-bold text-lg ${theme.text}`}>{goal.name}</h3>
<p className={`text-sm ${theme.textSecondary}`}>
Échéance: {new Date(goal.deadline).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
</p>
</div>
</div>
<div className="flex items-center space-x-2">
<button
onClick={() => {
const amount = parseFloat(prompt('Montant à ajouter à l\'épargne:'));
const description = prompt('Description (optionnel):') || `Dépôt du ${new Date().toLocaleDateString('fr-FR')}`;
if (amount && amount > 0) updateSavingsGoal(goal.id, amount, description);
}}
className="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
title="Ajouter"
>
<Icons.Plus className="h-4 w-4" />
</button>
</div>
</div>

{/* Barre de progression */}
<div className="mb-4">
<div className="flex justify-between text-sm mb-2">
<span className={theme.textSecondary}>
{showBalances ? `${goal.current.toLocaleString()}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}
</span>
<span className={theme.textSecondary}>
{showBalances ? `${goal.target.toLocaleString()}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}
</span>
</div>
<div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-4 mb-2`}>
<div
className="h-4 rounded-full transition-all duration-500"
style={{
width: `${Math.min(percentage, 100)}%`,
background: `linear-gradient(90deg, ${goal.color}, ${goal.color}dd)`
}}
/>
</div>
<div className="flex justify-between items-center">
<span className={`text-sm font-semibold ${theme.text}`}>{percentage.toFixed(1)}% {t('reached')}</span>
<span className={`text-sm ${theme.textSecondary}`}>
Restant: {showBalances ? `${(goal.target - goal.current).toLocaleString()}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}
</span>
</div>
</div>

{/* Projections intelligentes - CORRIGÉES POUR DATE EXACTE */}
<div className={`${darkMode ? 'bg-gradient-to-r from-indigo-900 to-purple-900' : 'bg-gradient-to-r from-indigo-50 to-purple-50'} rounded-xl p-4 mb-4 border ${darkMode ? 'border-indigo-700' : 'border-indigo-200'}`}>
<h4 className={`font-medium text-sm ${darkMode ? 'text-indigo-200' : 'text-indigo-800'} mb-3 flex items-center`}>
<Icons.Calculator className="h-4 w-4 mr-2" />
Projections jusqu'à l'échéance exacte
</h4>
<div className="space-y-2">
{projections.slice(0, 3).map((proj, index) => (
<div key={index} className={`text-xs ${darkMode ? 'text-indigo-300' : 'text-indigo-700'} space-y-1`}>
<div className="flex justify-between items-center">
<span>{proj.label}</span>
<span className={proj.beforeDeadline ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}>
→ {proj.achievementDate}
</span>
</div>
{proj.note && (
<p className={`text-xs ${proj.exactlyOnTime ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'} italic`}>
{proj.note}
</p>
)}
</div>
))}
</div>
</div>

{/* Barre de statut */}
<div className="absolute bottom-0 left-0 right-0 h-1" style={{background: `linear-gradient(to right, ${goal.color}, ${goal.color}80)`}} />
</div>
);
})}

{savingsGoals.length === 0 && (
<div className="col-span-2 text-center py-12">
<Icons.PiggyBank className={`h-16 w-16 mx-auto ${theme.textSecondary} mb-4`} />
<h3 className={`text-lg font-semibold ${theme.text} mb-2`}>Aucun objectif d'épargne</h3>
<p className={`${theme.textSecondary} mb-4`}>Créez votre premier objectif d'épargne pour commencer à économiser intelligemment</p>
<button
onClick={() => setShowSavingsModal(true)}
className={`px-6 py-3 rounded-lg ${theme.button.primary}`}
>
<Icons.Plus className="inline h-4 w-4 mr-2" />
Créer mon premier objectif
</button>
</div>
)}
</div>
</div>
)}

{/* Autres sections à implémenter... */}
{activeTab === 'calendar' && (
<div>Calendar Content avec Graphiques - À implémenter</div>
)}

{activeTab === 'recurring' && (
<div>Recurring Content avec Graphiques - À implémenter</div>
)}

{activeTab === 'debts' && (
<div>Debts Content avec Graphiques - À implémenter</div>
)}

{activeTab === 'reports' && (
<div>Reports Content - À implémenter</div>
)}
</main>

{/* Modals */}
{/* Income Modal */}
{showIncomeModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div className={`${theme.card} rounded-lg p-4 sm:p-6 w-full max-w-md border ${theme.border}`}>
<h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>{t('modifyMonthlyIncome')}</h3>
<input
type="number"
value={monthlyIncome}
onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || 0)}
className={`w-full px-3 py-2 border rounded-lg mb-4 text-base ${theme.input}`}
placeholder={t('monthlyIncome')}
/>
<div className="flex gap-2">
<button
onClick={() => setShowIncomeModal(false)}
className={`flex-1 px-4 py-2 rounded-lg ${theme.button.secondary}`}
>
{t('cancel')}
</button>
<button
onClick={() => {
setShowIncomeModal(false);
showNotification('Revenus mis à jour');
}}
className={`flex-1 px-4 py-2 rounded-lg ${theme.button.primary}`}
>
{t('save')}
</button>
</div>
</div>
</div>
)}

{/* Savings Modal */}
{showSavingsModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div className={`${theme.card} rounded-lg p-4 sm:p-6 w-full max-w-md border ${theme.border}`}>
<h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>{t('newSavingsGoal')}</h3>
<form onSubmit={(e) => {
e.preventDefault();
const formData = new FormData(e.target);
addSavingsGoal({
name: formData.get('name'),
target: parseFloat(formData.get('target')),
deadline: formData.get('deadline')
});
}}>
<input
name="name"
type="text"
placeholder={t('goalName')}
className={`w-full px-3 py-2 border rounded-lg mb-3 text-base ${theme.input}`}
required
/>
<input
name="target"
type="number"
placeholder={t('targetAmount')}
className={`w-full px-3 py-2 border rounded-lg mb-3 text-base ${theme.input}`}
required
/>
<input
name="deadline"
type="date"
className={`w-full px-3 py-2 border rounded-lg mb-4 text-base ${theme.input}`}
required
/>
<div className="flex gap-2">
<button
type="button"
onClick={() => setShowSavingsModal(false)}
className={`flex-1 px-4 py-2 rounded-lg ${theme.button.secondary}`}
>
{t('cancel')}
</button>
<button
type="submit"
className={`flex-1 px-4 py-2 rounded-lg ${theme.button.primary}`}
>
{t('create')}
</button>
</div>
</form>
</div>
</div>
)}

{/* Currency Modal */}
{showCurrencyModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div className={`${theme.card} rounded-lg p-4 sm:p-6 w-full max-w-md border ${theme.border}`}>
<h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>{t('addCurrency')}</h3>
<form onSubmit={(e) => {
e.preventDefault();
const formData = new FormData(e.target);
const newCurrency = {
code: formData.get('code').toUpperCase(),
symbol: formData.get('symbol'),
name: formData.get('name')
};
setCurrencies([...currencies, newCurrency]);
setShowCurrencyModal(false);
showNotification('Devise ajoutée avec succès');
}}>
<input
name="code"
type="text"
placeholder="Code (ex: USD)"
className={`w-full px-3 py-2 border rounded-lg mb-3 text-base ${theme.input}`}
maxLength="3"
required
/>
<input
name="symbol"
type="text"
placeholder="Symbole (ex: $)"
className={`w-full px-3 py-2 border rounded-lg mb-3 text-base ${theme.input}`}
maxLength="3"
required
/>
<input
name="name"
type="text"
placeholder="Nom (ex: Dollar américain)"
className={`w-full px-3 py-2 border rounded-lg mb-4 text-base ${theme.input}`}
required
/>
<div className="flex gap-2">
<button
type="button"
onClick={() => setShowCurrencyModal(false)}
className={`flex-1 px-4 py-2 rounded-lg ${theme.button.secondary}`}
>
{t('cancel')}
</button>
<button
type="submit"
className={`flex-1 px-4 py-2 rounded-lg ${theme.button.primary}`}
>
{t('add')}
</button>
</div>
</form>
</div>
</div>
)}
</div>
);
};

export default FinanceDashboard;