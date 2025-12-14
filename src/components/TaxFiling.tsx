import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Card,
  CardContent,
  Checkbox,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ArrowBack as ArrowBackIcon,
  Lightbulb as LightbulbIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Euro as EuroIcon,
  Receipt as ReceiptIcon,
  GridView as GridViewIcon,
  AccountBalance as AccountBalanceIcon,
  Folder as FolderIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon,
  HelpOutline as HelpOutlineIcon,
  Close as CloseIcon,
  PhoneAndroid as PhoneAndroidIcon,
} from '@mui/icons-material';
import CommuteToWork from './tax-filing/CommuteToWork';
import RelocationCosts from './tax-filing/RelocationCosts';
import PhoneInternetCosts from './tax-filing/PhoneInternetCosts';
import WorkEquipment from './tax-filing/WorkEquipment';
import PersonalDetails from './tax-filing/PersonalDetails';
import WageReplacementBenefits from './tax-filing/WageReplacementBenefits';
import InterestCapitalGains from './tax-filing/InterestCapitalGains';
import PensionsAnnuities from './tax-filing/PensionsAnnuities';
import RentalLeasing from './tax-filing/RentalLeasing';
import SelfEmployment from './tax-filing/SelfEmployment';
import PrivateSales from './tax-filing/PrivateSales';
import OtherIncome from './tax-filing/OtherIncome';
import InsuranceRetirement from './tax-filing/InsuranceRetirement';
import AncillaryCosts from './tax-filing/AncillaryCosts';
import CraftsmenHousehold from './tax-filing/CraftsmenHousehold';
import DonationsPartyContributions from './tax-filing/DonationsPartyContributions';
import FirstEducation from './tax-filing/FirstEducation';
import ChurchTax from './tax-filing/ChurchTax';
import CapitalFormingBenefits from './tax-filing/CapitalFormingBenefits';
import MaintenanceSupport from './tax-filing/MaintenanceSupport';
import CareHomePlacement from './tax-filing/CareHomePlacement';
import IllnessSpecialCircumstances from './tax-filing/IllnessSpecialCircumstances';
import EnergyMeasures from './tax-filing/EnergyMeasures';
import LossCarryforward from './tax-filing/LossCarryforward';
import TaxPrepayments from './tax-filing/TaxPrepayments';
import HouseholdInformation from './tax-filing/HouseholdInformation';
import AdditionalInformation from './tax-filing/AdditionalInformation';
import TaxOfficeNumber from './tax-filing/TaxOfficeNumber';
import BankDetails from './tax-filing/BankDetails';
import OptimizeStep from './tax-filing/OptimizeStep';
import SubmissionStep from './tax-filing/SubmissionStep';
import YearSelection from './tax-filing/YearSelection';
import GenericEmployeeTask from './tax-filing/GenericEmployeeTask';

const BRAND_GREEN = '#32CE69';
const INACTIVE_COLOR = '#475569';
const HOVER_BG = '#F1F5F9';
const ACTIVE_BLUE = '#3B82F6';

interface TopicItem {
  id: string;
  label: string;
  amount?: number;
  status?: 'completed' | 'pending' | 'empty';
  icon?: React.ReactNode;
}

interface MainTopic {
  id: string;
  label: string;
  icon: React.ReactNode;
  subItems?: TopicItem[];
  hasSubItems: boolean;
}

const mainTopics: MainTopic[] = [
  {
    id: 'personal',
    label: 'Persönliches',
    icon: <PersonIcon />,
    hasSubItems: true,
    subItems: [
      { id: 'felix', label: 'Félix', status: 'completed', icon: <CheckCircleIcon sx={{ color: BRAND_GREEN, fontSize: 16 }} /> },
    ],
  },
  {
    id: 'employee',
    label: 'Arbeitnehmer',
    icon: <WorkIcon />,
    hasSubItems: true,
    subItems: [
      { id: 'wage-statements', label: 'Lohnsteuerbescheinigungen', status: 'completed' },
      { id: 'commute', label: 'Wege zur Arbeit', amount: 0, status: 'pending' },
      { id: 'home-office', label: 'Arbeit zu Hause', amount: 0 },
      { id: 'work-equipment', label: 'Arbeitsmittel', amount: 110 },
      { id: 'phone-internet', label: 'Handy- & Internetkosten', amount: 0 },
      { id: 'account-fees', label: 'Kontoführungsgebühren', amount: 16 },
      { id: 'application-costs', label: 'Bewerbungskosten', amount: 0 },
      { id: 'unions', label: 'Gewerkschaften & Berufsverbände', amount: 0 },
      { id: 'relocation', label: 'Umzugskosten', amount: 0 },
      { id: 'travel', label: 'Berufliche Reisekosten', amount: 0 },
    ],
  },
  {
    id: 'other-income',
    label: 'Weitere Einkünfte',
    icon: <EuroIcon />,
    hasSubItems: true,
    subItems: [],
  },
  {
    id: 'general-expenses',
    label: 'Allgemeine Ausgaben',
    icon: <ReceiptIcon />,
    hasSubItems: true,
    subItems: [],
  },
  {
    id: 'other-topics',
    label: 'Weitere Themen',
    icon: <GridViewIcon />,
    hasSubItems: true,
    subItems: [],
  },
  {
    id: 'tax-office',
    label: 'Finanzamt & Bank',
    icon: <AccountBalanceIcon />,
    hasSubItems: true,
    subItems: [
      { id: 'tax-office-id', label: 'Finanzamt & Steuernummer', status: 'completed' },
      { id: 'bank-details', label: 'Bankverbindung', status: 'completed' },
    ],
  },
];

const additionalTopics = [
  { id: 'receipt-folder', label: 'Belegordner', icon: <FolderIcon /> },
  { id: 'tax-retrieval', label: 'Steuer-Abruf', icon: <BusinessIcon /> },
];

// Weitere Einkünfte Optionen
const otherIncomeOptions = [
  { id: 'wage-replacement', label: 'Lohnersatzleistungen', description: 'z.B. Krankengeld, Elterngeld' },
  { id: 'interest', label: 'Zinsen & andere Kapitalerträge', description: '' },
  { id: 'pensions', label: 'Renten & Pensionen', description: '' },
  { id: 'rental', label: 'Vermietung & Verpachtung', description: '' },
  { id: 'self-employment', label: 'Selbstständigkeit & Gewerbe', description: '' },
  { id: 'private-sales', label: 'Private Veräußerungsgeschäfte', description: '' },
  { id: 'other-income', label: 'Sonstige Einkünfte', description: '' },
];

// Allgemeine Ausgaben Optionen
const generalExpensesOptions = [
  { id: 'insurance', label: 'Versicherungen & Altersvorsorge', frequent: true },
    { id: 'utilities', label: 'Nebenkosten & Hausgeld', frequent: true, hasIcon: true },
  { id: 'craftsmen', label: 'Handwerker & Haushaltshilfen', frequent: false },
  { id: 'donations', label: 'Spenden & Parteibeiträge', frequent: false },
  { id: 'education', label: 'Erstausbildung ohne Arbeitsverhältnis', description: 'z.B. Bachelorstudium', frequent: false },
  { id: 'church-tax', label: 'Kirchensteuer & Kirchgeld', frequent: false },
];

// Weitere Themen Optionen
const otherTopicsOptions = [
  { id: 'capital-forming', label: 'Vermögenswirksame Leistungen', description: '' },
  { id: 'maintenance', label: 'Unterhalt & Unterstützungsleistungen', description: 'an Eltern, Kinder, Ehepartner, bedürftige Personen' },
  { id: 'care', label: 'Pflege & Heimunterbringung', description: '' },
  { id: 'illness', label: 'Krankheit & Besonderheiten', description: '' },
  { id: 'energy', label: 'Energetische Maßnahmen', description: '' },
  { id: 'household', label: 'Angaben zum Haushalt', description: '' },
  { id: 'loss-carryforward', label: 'Verlustvortrag & -rücktrag', description: '' },
  { id: 'prepayments', label: 'Steuervorauszahlungen', description: '' },
  { id: 'additional', label: 'Ergänzende Angaben', description: '' },
];

const TaxFiling: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('personal');
  const [selectedOtherIncome, setSelectedOtherIncome] = useState<string[]>(['wage-replacement']);
  const [selectedGeneralExpenses, setSelectedGeneralExpenses] = useState<string[]>(['insurance', 'utilities']);
  const [selectedOtherTopics, setSelectedOtherTopics] = useState<string[]>([]);
  const [showInfoBox, setShowInfoBox] = useState(true);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set(['wage-statements']));

  const steps = ['Eingaben', 'Optimieren', 'Abgabe'];

  // Collapse all topics when year is selected and user navigates to inputs
  useEffect(() => {
    if (selectedYear !== null && activeStep === 0) {
      setExpandedTopics([]);
    }
  }, [selectedYear, activeStep]);

  const handleTopicExpand = (topicId: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topicId) ? [] : [topicId]
    );
  };

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    // Auto-expand if topic has sub-items (only one topic can be expanded at a time)
    const topic = mainTopics.find((t) => t.id === topicId);
    if (topic && topic.hasSubItems) {
      setExpandedTopics([topicId]);
    }
  };

  const handleSubItemClick = (topicId: string, subItemId: string) => {
    setSelectedTopic(`${topicId}-${subItemId}`);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // Fehlererkennungslogik
  const detectErrors = () => {
    const errors: Array<{ id: string; title: string; description: string; category: string }> = [];
    
    // Fehler: Zinsen & andere Kapitalerträge nicht ausgefüllt
    if (selectedOtherIncome.includes('interest')) {
      errors.push({
        id: 'interest-empty',
        title: 'Zinsen & andere Kapitalerträge',
        description: 'Bitte füllen Sie den Bereich aus.',
        category: 'other-income-interest',
      });
    }

    // Fehler: Familienstand fehlt
    errors.push({
      id: 'marital-status-empty',
      title: 'Félix',
      description: 'Bitte geben Sie den Familienstand ein.',
      category: 'personal-felix',
    });

    // Fehler: Fragen nicht beantwortet (Beispiel)
    errors.push({
      id: 'question-1-unanswered',
      title: 'Félix',
      description: 'Bitte beantworten Sie diese Frage mit Ja oder Nein.',
      category: 'personal-felix',
    });

    errors.push({
      id: 'question-2-unanswered',
      title: 'Félix',
      description: 'Bitte beantworten Sie diese Frage mit Ja oder Nein.',
      category: 'personal-felix',
    });

    // Fehler: Bruttolohn fehlt
    if (!completedTasks.has('wage-statements')) {
      errors.push({
        id: 'gross-wage-empty',
        title: 'Lohnsteuerbescheinigungen',
        description: 'Bitte geben Sie den Bruttolohn an oder tragen Sie eine 0 ein.',
        category: 'employee-wage-statements',
      });
    }

    // Fehler: Umzugskosten - Umzugsdatum fehlt
    if (completedTasks.has('relocation')) {
      errors.push({
        id: 'relocation-date-empty',
        title: 'Umzugskosten',
        description: 'Bitte geben Sie das Umzugsdatum an.',
        category: 'employee-relocation',
      });

      errors.push({
        id: 'relocation-address-empty',
        title: 'Umzugskosten',
        description: 'Bitte tragen Sie die Postleitzahl und den Wohnort ein.',
        category: 'employee-relocation',
      });

      errors.push({
        id: 'relocation-street-empty',
        title: 'Umzugskosten',
        description: 'Bitte tragen Sie die Straße ein.',
        category: 'employee-relocation',
      });
    }

    // Fehler: Berufliche Reisekosten - Beschreibung fehlt
    if (completedTasks.has('travel')) {
      errors.push({
        id: 'travel-description-empty',
        title: 'Berufliche Reisekosten',
        description: 'Bitte geben Sie zur besseren Identifizierung eine Beschreibung ein.',
        category: 'employee-travel',
      });
    }

    return errors;
  };

  // Mögliche Probleme erkennen
  const detectProblems = () => {
    const problems: Array<{ id: string; title: string; description: string; category: string }> = [];

    // Problem: Kinder-Frage nicht beantwortet
    problems.push({
      id: 'children-question-unanswered',
      title: 'Félix',
      description: 'Bitte beantworten Sie die Frage, ob Sie Kinder haben, damit Ihre Familiensituation steuerlich korrekt berücksichtigt werden kann.',
      category: 'personal-felix',
    });

    // Problem: Zeitraum der Beschäftigung fehlt
    problems.push({
      id: 'employment-period-empty',
      title: 'Lohnsteuerbescheinigungen',
      description: 'Ergänzen Sie bitte den Zeitraum der Beschäftigung.',
      category: 'employee-wage-statements',
    });

    // Problem: Umzugskosten - keine Kosten eingetragen
    if (completedTasks.has('relocation')) {
      problems.push({
        id: 'relocation-costs-empty',
        title: 'Umzugskosten',
        description: 'Keine Kosten eingetragen. Sie haben bisher noch keine Umzugskosten eingetragen. Wenn Sie keine Kosten hatten, können Sie diesen Hinweis ignorieren.',
        category: 'employee-relocation',
      });

      problems.push({
        id: 'relocation-house-number-empty',
        title: 'Umzugskosten',
        description: 'Bitte tragen Sie die Hausnummer ein, falls eine vorhanden ist.',
        category: 'employee-relocation',
      });
    }

    // Problem: Berufliche Reisekosten - keine Kosten
    if (completedTasks.has('travel')) {
      problems.push({
        id: 'travel-costs-empty',
        title: 'Berufliche Reisekosten',
        description: 'Kosten für die Reise. Sie haben bisher noch keine Kosten für die Reise erfasst. Wenn Sie keine Kosten hatten, können Sie diesen Hinweis ignorieren.',
        category: 'employee-travel',
      });
    }

    return problems;
  };

  // Hinweise erkennen
  const detectHints = () => {
    const hints: Array<{ id: string; title: string; description: string; category: string }> = [];

    // Hinweise für nicht ausgefüllte Bereiche
    const employeeTasks = [
      { id: 'commute', title: 'Wege zur Arbeit' },
      { id: 'home-office', title: 'Arbeit zu Hause' },
      { id: 'phone-internet', title: 'Handy- & Internetkosten' },
      { id: 'account-fees', title: 'Kontoführungsgebühren' },
      { id: 'application-costs', title: 'Bewerbungskosten' },
      { id: 'unions', title: 'Gewerkschaften & Berufsverbände' },
    ];

    employeeTasks.forEach((task) => {
      if (!completedTasks.has(task.id)) {
        hints.push({
          id: `hint-${task.id}`,
          title: task.title,
          description: 'Sie haben noch keine Angaben gemacht.',
          category: `employee-${task.id}`,
        });
      }
    });

    // Hinweis: Kontoführungsgebühren nicht bestätigt
    if (completedTasks.has('account-fees')) {
      hints.push({
        id: 'account-fees-not-confirmed',
        title: 'Kontoführungsgebühren',
        description: 'Sie haben die Angaben noch nicht bestätigt.',
        category: 'employee-account-fees',
      });
    }

    // Hinweis: Lohnersatzleistungen
    if (selectedOtherIncome.includes('wage-replacement')) {
      hints.push({
        id: 'wage-replacement-hint',
        title: 'Lohnersatzleistungen',
        description: 'Sie haben noch keine Angaben gemacht.',
        category: 'other-income-wage-replacement',
      });
    }

    return hints;
  };

  const handleNavigateToInput = (category: string) => {
    setActiveStep(0); // Zurück zu Step 1
    setSelectedTopic(category);
    // Auto-expand relevant topic
    const topicId = category.split('-')[0];
    if (!expandedTopics.includes(topicId)) {
      setExpandedTopics([...expandedTopics, topicId]);
    }
  };

  const handleDismiss = (type: 'error' | 'problem' | 'hint', id: string) => {
    // Dismiss logic - could be stored in state if needed
    console.log(`Dismissed ${type}: ${id}`);
  };

  const renderContent = () => {
    // Step 3: Abgabe
    if (activeStep === 2) {
        return (
        <SubmissionStep
          onBack={handleBack}
          onSubmit={() => {
            // Handle submission
            console.log('Submitting to tax advisor...');
            alert('Ihre Steuererklärung wurde an den Steuerberater weitergeleitet.');
          }}
        />
      );
    }

    // Step 2: Optimieren
    if (activeStep === 1) {
      const errors = detectErrors();
      const problems = detectProblems();
      const hints = detectHints();

        return (
        <OptimizeStep
          errors={errors.map((e) => ({
            ...e,
            onClick: () => handleNavigateToInput(e.category),
          }))}
          problems={problems.map((p) => ({
            ...p,
            onClick: () => handleNavigateToInput(p.category),
          }))}
          hints={hints.map((h) => ({
            ...h,
            onClick: () => handleNavigateToInput(h.category),
          }))}
          onNavigateToInput={handleNavigateToInput}
          onDismiss={handleDismiss}
          onBack={() => {
            console.log('onBack called in OptimizeStep');
            setSelectedYear(null);
            setActiveStep(0);
          }}
        />
      );
    }

    // Step 1: Eingaben (existing content)
    // Persönliches - Overview
    if (selectedTopic === 'personal') {
        return (
        <Box>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1E293B' }}>
            Persönliches
          </Typography>
          <Card
            onClick={() => handleSubItemClick('personal', 'felix')}
            sx={{
              cursor: 'pointer',
              '&:hover': { boxShadow: 2 },
              transition: 'all 0.2s',
            }}
          >
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 500, color: '#1E293B' }}>
                Félix
              </Typography>
              <ArrowForwardIcon sx={{ color: INACTIVE_COLOR }} />
            </CardContent>
          </Card>
        </Box>
      );
    }

    // Persönliches - Detail
    if (selectedTopic.startsWith('personal-')) {
      return <PersonalDetails />;
    }

    // Arbeitnehmer - Overview
    if (selectedTopic === 'employee') {
      const employeeSubItems = mainTopics.find((t) => t.id === 'employee')?.subItems || [];
      const totalAmount = employeeSubItems.reduce((sum, item) => sum + (item.amount || 0), 0);

      return (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
              Arbeitnehmer
            </Typography>
            <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
              Themenauswahl ändern
            </Button>
          </Box>
          <List sx={{ bgcolor: '#F7F8F9', borderRadius: 2, p: 0 }}>
            {employeeSubItems.map((item) => {
              const isCompleted = completedTasks.has(item.id);
              return (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton
                    onClick={() => handleSubItemClick('employee', item.id)}
                    sx={{
                      borderBottom: '1px solid #E2E8F0',
                      '&:last-child': { borderBottom: 'none' },
                      '&:hover': { bgcolor: '#FFFFFF' },
                    }}
                  >
                    <Checkbox
                      checked={isCompleted}
                      onChange={(e) => {
                        e.stopPropagation();
                        const newCompleted = new Set(completedTasks);
                        if (e.target.checked) {
                          newCompleted.add(item.id);
                        } else {
                          newCompleted.delete(item.id);
                        }
                        setCompletedTasks(newCompleted);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      sx={{
                        color: BRAND_GREEN,
                        '&.Mui-checked': {
                          color: BRAND_GREEN,
                        },
                        mr: 1,
                      }}
                    />
                    <ListItemText
                      primary={item.label}
                      secondary={isCompleted ? 'erfasst' : undefined}
                      primaryTypographyProps={{ fontWeight: 500, color: '#1E293B' }}
                      secondaryTypographyProps={{ color: INACTIVE_COLOR, fontSize: '12px' }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: '#1E293B', fontWeight: 500, mr: 2 }}
                    >
                      {item.amount !== undefined ? `${item.amount.toLocaleString('de-DE')},- €` : ''}
                    </Typography>
                    <ArrowForwardIcon sx={{ color: INACTIVE_COLOR, fontSize: 20 }} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#1E293B' }}>
              {totalAmount.toLocaleString('de-DE')},- €
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 3, color: INACTIVE_COLOR }}>
            Nicht ausgewählte Themen:
          </Typography>
        </Box>
      );
    }

    // Arbeitnehmer - Detail Views
    if (selectedTopic.startsWith('employee-')) {
      const subItemId = selectedTopic.replace('employee-', '');
      
      if (subItemId === 'commute') {
        return <CommuteToWork />;
      }
      
      if (subItemId === 'relocation') {
        return <RelocationCosts />;
      }
      
      if (subItemId === 'phone-internet') {
        return <PhoneInternetCosts />;
      }
      
      if (subItemId === 'work-equipment') {
        return <WorkEquipment />;
      }
      
      // Generic task handler with tax info
      const taskLabel = mainTopics.find((t) => t.id === 'employee')?.subItems?.find((s) => s.id === subItemId)?.label || 'Detail';
      
      // Tax info for different tasks
      const taxInfoMap: { [key: string]: { title: string; content: string } } = {
        'home-office': {
          title: 'Home-Office-Pauschale',
          content: 'Sie können 6 € pro Home-Office-Tag im Jahr absetzen, maximal 1.260 € pro Jahr. Voraussetzung ist, dass Sie regelmäßig von zu Hause arbeiten.',
        },
        'work-equipment': {
          title: 'Arbeitsmittel',
          content: 'Arbeitsmittel wie Computer, Büromöbel oder Fachliteratur können als Werbungskosten abgesetzt werden. Bei Anschaffungskosten über 800 € muss über mehrere Jahre abgeschrieben werden.',
        },
        'phone-internet': {
          title: 'Handy- & Internetkosten',
          content: 'Wenn Sie Ihr Handy oder Internet beruflich nutzen, können Sie einen Anteil der Kosten absetzen. Bei privater und beruflicher Nutzung wird üblicherweise ein Anteil von 20-30% anerkannt.',
        },
        'account-fees': {
          title: 'Kontoführungsgebühren',
          content: 'Kontoführungsgebühren für ein beruflich genutztes Konto können vollständig als Werbungskosten abgesetzt werden.',
        },
        'application-costs': {
          title: 'Bewerbungskosten',
          content: 'Kosten für Bewerbungen (Porto, Bewerbungsfotos, Fahrtkosten zu Vorstellungsgesprächen) können als Werbungskosten abgesetzt werden.',
        },
        'unions': {
          title: 'Gewerkschaften & Berufsverbände',
          content: 'Beiträge zu Gewerkschaften oder berufsständischen Verbänden können vollständig als Werbungskosten abgesetzt werden.',
        },
        'travel': {
          title: 'Berufliche Reisekosten',
          content: 'Reisekosten für beruflich veranlasste Reisen (Fahrtkosten, Übernachtung, Verpflegung) können als Werbungskosten abgesetzt werden. Es gelten Pauschalen für Verpflegungsmehraufwand.',
        },
      };

      const taskTaxInfo = taxInfoMap[subItemId];
      
        return (
        <GenericEmployeeTask
          title={taskLabel}
          taxInfo={taskTaxInfo}
          fields={subItemId === 'home-office' ? [
            {
              label: 'Anzahl Home-Office-Tage im Jahr',
              type: 'number',
              tooltip: 'Geben Sie die Anzahl der Tage an, an denen Sie im Jahr 2025 von zu Hause gearbeitet haben.',
              placeholder: '0',
            },
          ] : subItemId === 'work-equipment' ? [
            {
              label: 'Betrag für Arbeitsmittel',
              type: 'number',
              tooltip: 'Geben Sie die Gesamtkosten für Arbeitsmittel an, die Sie im Jahr 2025 angeschafft haben.',
              placeholder: '0,00',
            },
          ] : subItemId === 'phone-internet' ? [
            {
              label: 'Handy-Kosten (anteilig beruflich)',
              type: 'number',
              tooltip: 'Geben Sie den beruflichen Anteil Ihrer Handykosten an.',
              placeholder: '0,00',
            },
            {
              label: 'Internetkosten (anteilig beruflich)',
              type: 'number',
              tooltip: 'Geben Sie den beruflichen Anteil Ihrer Internetkosten an.',
              placeholder: '0,00',
            },
          ] : subItemId === 'account-fees' ? [
            {
              label: 'Kontoführungsgebühren',
              type: 'number',
              tooltip: 'Geben Sie die Kontoführungsgebühren für Ihr beruflich genutztes Konto an.',
              placeholder: '0,00',
            },
          ] : subItemId === 'application-costs' ? [
            {
              label: 'Bewerbungskosten',
              type: 'number',
              tooltip: 'Geben Sie die Gesamtkosten für Bewerbungen an (Porto, Fotos, Fahrtkosten zu Vorstellungsgesprächen).',
              placeholder: '0,00',
            },
          ] : subItemId === 'unions' ? [
            {
              label: 'Beiträge zu Gewerkschaften/Berufsverbänden',
              type: 'number',
              tooltip: 'Geben Sie die Beiträge an, die Sie im Jahr 2025 gezahlt haben.',
              placeholder: '0,00',
            },
          ] : subItemId === 'travel' ? [
            {
              label: 'Berufliche Reisekosten',
              type: 'number',
              tooltip: 'Geben Sie die Gesamtkosten für beruflich veranlasste Reisen an.',
              placeholder: '0,00',
            },
          ] : []}
        />
      );
    }

    // Weitere Einkünfte - Overview (Checkbox Selection)
    if (selectedTopic === 'other-income') {
        return (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
              Weitere Einkünfte
            </Typography>
            <IconButton
              onClick={() => {
                // Handle close
              }}
              sx={{ color: INACTIVE_COLOR }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mb: 2 }}>
            Wählen Sie passende Themen aus.
          </Typography>
          <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mb: 4 }}>
            Sie können Ihre Auswahl jederzeit ändern.
          </Typography>
          <List sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}>
            {otherIncomeOptions.map((option) => (
              <ListItem key={option.id} disablePadding>
                <ListItemButton
                  sx={{
                    borderBottom: '1px solid #E2E8F0',
                    '&:last-child': { borderBottom: 'none' },
                    py: 2,
                  }}
                >
                  <Checkbox
                    checked={selectedOtherIncome.includes(option.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOtherIncome([...selectedOtherIncome, option.id]);
                      } else {
                        setSelectedOtherIncome(selectedOtherIncome.filter((id) => id !== option.id));
                      }
                    }}
                    sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }}
                  />
                  <ListItemText
                    primary={option.label}
                    secondary={option.description}
                    primaryTypographyProps={{ fontWeight: 500, color: '#1E293B' }}
                    secondaryTypographyProps={{ color: INACTIVE_COLOR, fontSize: '13px' }}
                  />
                  <Tooltip title="Weitere Informationen" arrow>
                    <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: ACTIVE_BLUE,
                color: '#FFFFFF',
                textTransform: 'none',
                px: 4,
                '&:hover': { bgcolor: '#2563EB' },
              }}
            >
              Auswahl übernehmen
            </Button>
          </Box>
        </Box>
      );
    }

    // Weitere Einkünfte - Detail Views
    if (selectedTopic.startsWith('other-income-')) {
      const subItemId = selectedTopic.replace('other-income-', '');
      
      if (subItemId === 'wage-replacement') {
        return <WageReplacementBenefits />;
      }
      
      if (subItemId === 'interest') {
        return <InterestCapitalGains />;
      }
      
      if (subItemId === 'pensions') {
        return <PensionsAnnuities />;
      }
      
      if (subItemId === 'rental') {
        return <RentalLeasing />;
      }
      
      if (subItemId === 'self-employment') {
        return <SelfEmployment />;
      }
      
      if (subItemId === 'private-sales') {
        return <PrivateSales />;
      }
      
      if (subItemId === 'other-income') {
        return <OtherIncome />;
      }
    }

    // Allgemeine Ausgaben - Overview (Checkbox Selection)
    if (selectedTopic === 'general-expenses') {
        return (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
              Allgemeine Ausgaben
            </Typography>
            <IconButton
              onClick={() => {
                // Handle close
              }}
              sx={{ color: INACTIVE_COLOR }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {showInfoBox && (
            <Paper
              sx={{
                bgcolor: '#EFF6FF',
                p: 2,
                mb: 3,
                borderRadius: 2,
                position: 'relative',
              }}
            >
              <IconButton
                size="small"
                onClick={() => setShowInfoBox(false)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: INACTIVE_COLOR,
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <Typography variant="body2" sx={{ color: '#1E40AF', pr: 4 }}>
                Wählen Sie passende Themen aus. Sie können Ihre Auswahl jederzeit ändern.
              </Typography>
            </Paper>
          )}
          <List sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}>
            {generalExpensesOptions.map((option) => (
              <ListItem key={option.id} disablePadding>
                <ListItemButton
                  sx={{
                    borderBottom: '1px solid #E2E8F0',
                    '&:last-child': { borderBottom: 'none' },
                    py: 2,
                  }}
                >
                  <Checkbox
                    checked={selectedGeneralExpenses.includes(option.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedGeneralExpenses([...selectedGeneralExpenses, option.id]);
                      } else {
                        setSelectedGeneralExpenses(selectedGeneralExpenses.filter((id) => id !== option.id));
                      }
                    }}
                    sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }}
                  />
                  <ListItemText
                    primary={option.label}
                    secondary={option.description}
                    primaryTypographyProps={{ fontWeight: 500, color: '#1E293B' }}
                    secondaryTypographyProps={{ color: INACTIVE_COLOR, fontSize: '13px' }}
                  />
                  {option.frequent && (
                    <Chip
                      label="häufig"
                      size="small"
                      sx={{
                        bgcolor: BRAND_GREEN,
                        color: '#FFFFFF',
                        fontSize: '11px',
                        height: 20,
                        mr: 1,
                      }}
                    />
                  )}
                  {(option as any).hasIcon && (
                    <PhoneAndroidIcon sx={{ color: ACTIVE_BLUE, fontSize: 20, mr: 1 }} />
                  )}
                  <Tooltip title="Weitere Informationen" arrow>
                    <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: ACTIVE_BLUE,
                color: '#FFFFFF',
                textTransform: 'none',
                px: 4,
                '&:hover': { bgcolor: '#2563EB' },
              }}
            >
              Auswahl übernehmen
            </Button>
          </Box>
        </Box>
      );
    }

    // Allgemeine Ausgaben - Detail Views
    if (selectedTopic.startsWith('general-expenses-')) {
      const subItemId = selectedTopic.replace('general-expenses-', '');
      
      if (subItemId === 'insurance') {
        return <InsuranceRetirement />;
      }
      
      if (subItemId === 'utilities') {
        return <AncillaryCosts />;
      }
      
      if (subItemId === 'craftsmen') {
        return <CraftsmenHousehold />;
      }
      
      if (subItemId === 'donations') {
        return <DonationsPartyContributions />;
      }
      
      if (subItemId === 'education') {
        return <FirstEducation />;
      }
      
      if (subItemId === 'church-tax') {
        return <ChurchTax />;
      }
    }

    // Weitere Themen - Overview (Checkbox Selection)
    if (selectedTopic === 'other-topics') {
        return (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
              Weitere Themen
        </Typography>
            <IconButton
              onClick={() => {
                // Handle close
              }}
              sx={{ color: INACTIVE_COLOR }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {showInfoBox && (
            <Paper
              sx={{
                bgcolor: '#EFF6FF',
                p: 2,
                mb: 3,
                borderRadius: 2,
                position: 'relative',
              }}
            >
              <IconButton
                size="small"
                onClick={() => setShowInfoBox(false)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: INACTIVE_COLOR,
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <Typography variant="body2" sx={{ color: '#1E40AF', pr: 4 }}>
                Wählen Sie passende Themen aus. Sie können Ihre Auswahl jederzeit ändern.
        </Typography>
            </Paper>
          )}
          <List sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}>
            {otherTopicsOptions.map((option) => (
              <ListItem key={option.id} disablePadding>
                <ListItemButton
                  sx={{
                    borderBottom: '1px solid #E2E8F0',
                    '&:last-child': { borderBottom: 'none' },
                    py: 2,
                  }}
                >
                  <Checkbox
                    checked={selectedOtherTopics.includes(option.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOtherTopics([...selectedOtherTopics, option.id]);
                      } else {
                        setSelectedOtherTopics(selectedOtherTopics.filter((id) => id !== option.id));
                      }
                    }}
                    sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }}
                  />
                  <ListItemText
                    primary={option.label}
                    secondary={option.description}
                    primaryTypographyProps={{ fontWeight: 500, color: '#1E293B' }}
                    secondaryTypographyProps={{ color: INACTIVE_COLOR, fontSize: '13px' }}
                  />
                  <Tooltip title="Weitere Informationen" arrow>
                    <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: ACTIVE_BLUE,
                color: '#FFFFFF',
                textTransform: 'none',
                px: 4,
                '&:hover': { bgcolor: '#2563EB' },
              }}
            >
              Auswahl übernehmen
            </Button>
          </Box>
        </Box>
      );
    }

    // Weitere Themen - Detail Views
    if (selectedTopic.startsWith('other-topics-')) {
      const subItemId = selectedTopic.replace('other-topics-', '');
      
      if (subItemId === 'capital-forming') {
        return <CapitalFormingBenefits />;
      }
      
      if (subItemId === 'maintenance') {
        return <MaintenanceSupport />;
      }
      
      if (subItemId === 'care') {
        return <CareHomePlacement />;
      }
      
      if (subItemId === 'illness') {
        return <IllnessSpecialCircumstances />;
      }
      
      if (subItemId === 'energy') {
        return <EnergyMeasures />;
      }
      
      if (subItemId === 'household') {
        return <HouseholdInformation />;
      }
      
      if (subItemId === 'loss-carryforward') {
        return <LossCarryforward />;
      }
      
      if (subItemId === 'prepayments') {
        return <TaxPrepayments />;
      }
      
      if (subItemId === 'additional') {
        return <AdditionalInformation />;
      }
    }

    // Finanzamt & Bank - Overview
    if (selectedTopic === 'tax-office') {
        return (
        <Box>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1E293B' }}>
            Finanzamt & Bank
          </Typography>
          <List sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleSubItemClick('tax-office', 'tax-office-id')}
                sx={{
                  borderBottom: '1px solid #E2E8F0',
                  '&:hover': { bgcolor: HOVER_BG },
                }}
              >
                <ListItemText
                  primary="Finanzamt & Steuernummer"
                  primaryTypographyProps={{ fontWeight: 500, color: '#1E293B' }}
                />
                <ArrowForwardIcon sx={{ color: INACTIVE_COLOR }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleSubItemClick('tax-office', 'bank-details')}
                sx={{
                  '&:hover': { bgcolor: HOVER_BG },
                }}
              >
                <ListItemText
                  primary="Bankverbindung"
                  primaryTypographyProps={{ fontWeight: 500, color: '#1E293B' }}
                />
                <ArrowForwardIcon sx={{ color: INACTIVE_COLOR }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      );
    }

    // Finanzamt & Bank - Detail Views
    if (selectedTopic.startsWith('tax-office-')) {
      const subItemId = selectedTopic.replace('tax-office-', '');

      if (subItemId === 'tax-office-id') {
        return <TaxOfficeNumber />;
      }

      if (subItemId === 'bank-details') {
        return <BankDetails />;
      }
    }

    return null;
  };

  // Show year selection if no year is selected
  if (selectedYear === null) {
        return (
      <YearSelection
        onSelectYear={(year) => setSelectedYear(year)}
        onCreateNew={(year) => setSelectedYear(year)}
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 24px)', bgcolor: '#FFFFFF' }}>
      {/* Header with Stepper */}
      <Box
        sx={{
          borderBottom: '1px solid #E2E8F0',
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            size="small"
            onClick={() => {
              if (activeStep === 1) {
                // In Step 2 (Optimieren), zurück zur Jahresauswahl
                setSelectedYear(null);
                setActiveStep(0);
              } else {
                // In Step 1 (Eingaben), zurück zur Jahresauswahl
                setSelectedYear(null);
              }
            }}
            sx={{ color: INACTIVE_COLOR }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="body1" sx={{ color: INACTIVE_COLOR, fontWeight: 500 }}>
            {activeStep === 1 ? 'Übersicht' : `Steuererklärung ${selectedYear}`}
        </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            <LightbulbIcon sx={{ color: '#F59E0B', fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
              Tipps
        </Typography>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: '#EF4444',
                ml: 0.5,
              }}
            />
          </Box>
        </Box>
        <Stepper activeStep={activeStep} sx={{ flex: 1, maxWidth: 400, mx: 'auto' }}>
          {steps.map((label, index) => (
              <Step key={label}>
              <StepLabel
                onClick={() => {
                  // Allow navigation to any step if year is selected
                  if (selectedYear !== null) {
                    setActiveStep(index);
                  }
                }}
                sx={{
                  cursor: selectedYear !== null ? 'pointer' : 'default',
                  '& .MuiStepLabel-label': {
                    color: index === activeStep ? ACTIVE_BLUE : INACTIVE_COLOR,
                    fontWeight: index === activeStep ? 600 : 400,
                    fontSize: '14px',
                  },
                  '& .MuiStepIcon-root': {
                    color: index === activeStep ? ACTIVE_BLUE : '#E2E8F0',
                    '&.Mui-active': {
                      color: ACTIVE_BLUE,
                    },
                    '&.Mui-completed': {
                      color: ACTIVE_BLUE,
                    },
                  },
                }}
              >
                {index + 1} {label}
              </StepLabel>
              </Step>
            ))}
          </Stepper>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Navigation */}
        <Box
          sx={{
            width: 280,
            borderRight: '1px solid #E2E8F0',
            overflow: 'auto',
            bgcolor: '#FFFFFF',
          }}
        >
          {mainTopics.map((topic) => (
            <Box key={topic.id}>
              {topic.hasSubItems ? (
                <Accordion
                  expanded={expandedTopics.includes(topic.id)}
                  onChange={() => handleTopicExpand(topic.id)}
                  sx={{
                    boxShadow: 'none',
                    border: 'none',
                    '&:before': { display: 'none' },
                    '&.Mui-expanded': { margin: 0 },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      expandedTopics.includes(topic.id) ? (
                        <ExpandLessIcon sx={{ color: selectedTopic === topic.id ? '#FFFFFF' : INACTIVE_COLOR }} />
                      ) : (
                        <ExpandMoreIcon sx={{ color: selectedTopic === topic.id ? '#FFFFFF' : INACTIVE_COLOR }} />
                      )
                    }
                    onClick={() => handleTopicSelect(topic.id)}
                    sx={{
                      px: 2,
                      py: 1.5,
                      mx: 1,
                      my: 0.5,
                      borderRadius: '8px',
                      minHeight: 48,
                      '&.Mui-expanded': { minHeight: 48 },
                      bgcolor: selectedTopic === topic.id ? BRAND_GREEN : 'transparent',
                      color: selectedTopic === topic.id ? '#FFFFFF' : INACTIVE_COLOR,
                      '&:hover': {
                        bgcolor: selectedTopic === topic.id ? BRAND_GREEN : HOVER_BG,
                      },
                      '& .MuiAccordionSummary-content': {
                        margin: 0,
                        alignItems: 'center',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: selectedTopic === topic.id ? '#FFFFFF' : ACTIVE_BLUE }}>
                      {topic.icon}
                    </ListItemIcon>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color: selectedTopic === topic.id ? '#FFFFFF' : '#1E293B',
                        flex: 1,
                      }}
                    >
                      {topic.label}
                    </Typography>
                  </AccordionSummary>
                  {topic.subItems && topic.id !== 'other-income' && topic.id !== 'general-expenses' && topic.id !== 'other-topics' && (
                    <AccordionDetails sx={{ p: 0, px: 2, pb: 1 }}>
                      {topic.subItems.map((subItem) => {
                        const isCompleted = completedTasks.has(subItem.id);
                        return (
                          <ListItemButton
                            key={subItem.id}
                            onClick={() => handleSubItemClick(topic.id, subItem.id)}
                            sx={{
                              py: 0.75,
                              px: 2,
                              borderRadius: '6px',
                              mb: 0.5,
                              minHeight: 36,
                              '&:hover': { bgcolor: HOVER_BG },
                            }}
                          >
                            <Checkbox
                              checked={isCompleted}
                              onChange={(e) => {
                                e.stopPropagation();
                                const newCompleted = new Set(completedTasks);
                                if (e.target.checked) {
                                  newCompleted.add(subItem.id);
                                } else {
                                  newCompleted.delete(subItem.id);
                                }
                                setCompletedTasks(newCompleted);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              size="small"
                              sx={{
                                color: BRAND_GREEN,
                                '&.Mui-checked': {
                                  color: BRAND_GREEN,
                                },
                                mr: 1,
                                p: 0.5,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#1E293B',
                                fontSize: '14px',
                              }}
                            >
                              {subItem.label}
                            </Typography>
                          </ListItemButton>
                        );
                      })}
                    </AccordionDetails>
                  )}
                  {topic.id === 'other-income' && (
                    <AccordionDetails sx={{ p: 0, px: 2, pb: 1 }}>
                      {selectedOtherIncome.map((incomeId) => {
                        const incomeOption = otherIncomeOptions.find((opt) => opt.id === incomeId);
                        if (!incomeOption) return null;
                        const isSelected = selectedTopic === `other-income-${incomeId}`;
                        const isCompleted = completedTasks.has(`other-income-${incomeId}`);
                        return (
                          <ListItemButton
                            key={incomeId}
                            onClick={() => handleSubItemClick('other-income', incomeId)}
                            sx={{
                              py: 0.75,
                              px: 2,
                              borderRadius: '6px',
                              mb: 0.5,
                              minHeight: 36,
                              bgcolor: isSelected ? HOVER_BG : 'transparent',
                              '&:hover': { bgcolor: HOVER_BG },
                            }}
                          >
                            <Checkbox
                              checked={isCompleted}
                              onChange={(e) => {
                                e.stopPropagation();
                                const newCompleted = new Set(completedTasks);
                                if (e.target.checked) {
                                  newCompleted.add(`other-income-${incomeId}`);
                                } else {
                                  newCompleted.delete(`other-income-${incomeId}`);
                                }
                                setCompletedTasks(newCompleted);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              size="small"
                              sx={{
                                color: BRAND_GREEN,
                                '&.Mui-checked': {
                                  color: BRAND_GREEN,
                                },
                                mr: 1,
                                p: 0.5,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                color: isSelected ? ACTIVE_BLUE : '#1E293B',
                                fontSize: '14px',
                                fontWeight: isSelected ? 600 : 400,
                              }}
                            >
                              {incomeOption.label}
                            </Typography>
                          </ListItemButton>
                        );
                      })}
                    </AccordionDetails>
                  )}
                  {topic.id === 'general-expenses' && (
                    <AccordionDetails sx={{ p: 0, px: 2, pb: 1 }}>
                      {selectedGeneralExpenses.map((expenseId) => {
                        const expenseOption = generalExpensesOptions.find((opt) => opt.id === expenseId);
                        if (!expenseOption) return null;
                        const isSelected = selectedTopic === `general-expenses-${expenseId}`;
                        const isCompleted = completedTasks.has(`general-expenses-${expenseId}`);
                        return (
                          <ListItemButton
                            key={expenseId}
                            onClick={() => handleSubItemClick('general-expenses', expenseId)}
                            sx={{
                              py: 0.75,
                              px: 2,
                              borderRadius: '6px',
                              mb: 0.5,
                              minHeight: 36,
                              bgcolor: isSelected ? HOVER_BG : 'transparent',
                              '&:hover': { bgcolor: HOVER_BG },
                            }}
                          >
                            <Checkbox
                              checked={isCompleted}
                              onChange={(e) => {
                                e.stopPropagation();
                                const newCompleted = new Set(completedTasks);
                                if (e.target.checked) {
                                  newCompleted.add(`general-expenses-${expenseId}`);
                                } else {
                                  newCompleted.delete(`general-expenses-${expenseId}`);
                                }
                                setCompletedTasks(newCompleted);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              size="small"
                              sx={{
                                color: BRAND_GREEN,
                                '&.Mui-checked': {
                                  color: BRAND_GREEN,
                                },
                                mr: 1,
                                p: 0.5,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                color: isSelected ? ACTIVE_BLUE : '#1E293B',
                                fontSize: '14px',
                                fontWeight: isSelected ? 600 : 400,
                              }}
                            >
                              {expenseOption.label}
                            </Typography>
                          </ListItemButton>
                        );
                      })}
                    </AccordionDetails>
                  )}
                  {topic.id === 'other-topics' && (
                    <AccordionDetails sx={{ p: 0, px: 2, pb: 1 }}>
                      {selectedOtherTopics.map((topicId) => {
                        const topicOption = otherTopicsOptions.find((opt) => opt.id === topicId);
                        if (!topicOption) return null;
                        const isSelected = selectedTopic === `other-topics-${topicId}`;
                        const isCompleted = completedTasks.has(`other-topics-${topicId}`);
                        return (
                          <ListItemButton
                            key={topicId}
                            onClick={() => handleSubItemClick('other-topics', topicId)}
                            sx={{
                              py: 0.75,
                              px: 2,
                              borderRadius: '6px',
                              mb: 0.5,
                              minHeight: 36,
                              bgcolor: isSelected ? HOVER_BG : 'transparent',
                              '&:hover': { bgcolor: HOVER_BG },
                            }}
                          >
                            <Checkbox
                              checked={isCompleted}
                              onChange={(e) => {
                                e.stopPropagation();
                                const newCompleted = new Set(completedTasks);
                                if (e.target.checked) {
                                  newCompleted.add(`other-topics-${topicId}`);
                                } else {
                                  newCompleted.delete(`other-topics-${topicId}`);
                                }
                                setCompletedTasks(newCompleted);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              size="small"
                              sx={{
                                color: BRAND_GREEN,
                                '&.Mui-checked': {
                                  color: BRAND_GREEN,
                                },
                                mr: 1,
                                p: 0.5,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                color: isSelected ? ACTIVE_BLUE : '#1E293B',
                                fontSize: '14px',
                                fontWeight: isSelected ? 600 : 400,
                              }}
                            >
                              {topicOption.label}
                            </Typography>
                          </ListItemButton>
                        );
                      })}
                    </AccordionDetails>
                  )}
                </Accordion>
              ) : (
                <ListItemButton
                  onClick={() => handleTopicSelect(topic.id)}
                  sx={{
                    px: 2,
                    py: 1.5,
                    mx: 1,
                    my: 0.5,
                    borderRadius: '8px',
                    bgcolor: selectedTopic === topic.id ? BRAND_GREEN : 'transparent',
                    color: selectedTopic === topic.id ? '#FFFFFF' : INACTIVE_COLOR,
                    '&:hover': {
                      bgcolor: selectedTopic === topic.id ? BRAND_GREEN : HOVER_BG,
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: selectedTopic === topic.id ? '#FFFFFF' : ACTIVE_BLUE }}>
                    {topic.icon}
                  </ListItemIcon>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      color: selectedTopic === topic.id ? '#FFFFFF' : '#1E293B',
                    }}
                  >
                    {topic.label}
                  </Typography>
                </ListItemButton>
              )}
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          {additionalTopics.map((topic) => (
            <ListItemButton
              key={topic.id}
              onClick={() => handleTopicSelect(topic.id)}
              sx={{
                px: 2,
                py: 1.5,
                mx: 1,
                my: 0.5,
                borderRadius: '8px',
                '&:hover': { bgcolor: HOVER_BG },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: ACTIVE_BLUE }}>{topic.icon}</ListItemIcon>
              <Typography variant="body1" sx={{ fontWeight: 500, color: '#1E293B' }}>
                {topic.label}
              </Typography>
            </ListItemButton>
          ))}
        </Box>

        {/* Right Content Area */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3, bgcolor: '#F7F8F9' }}>
          {renderContent()}
      </Box>
      </Box>

      {/* Footer Navigation */}
      <Box
        sx={{
          borderTop: '1px solid #E2E8F0',
          px: 3,
          py: 2,
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: '#FFFFFF',
        }}
      >
        {activeStep > 0 && (
          <Button
            variant="text"
            onClick={handleBack}
            sx={{ color: INACTIVE_COLOR, textTransform: 'none' }}
          >
            &lt; zurück
          </Button>
        )}
        {activeStep < steps.length - 1 && (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              bgcolor: ACTIVE_BLUE,
              color: '#FFFFFF',
              textTransform: 'none',
              px: 3,
              '&:hover': { bgcolor: '#2563EB' },
            }}
          >
            weiter &gt;
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TaxFiling; 
