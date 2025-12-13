import {
  Receipt as ReceiptIcon,
  Description as DescriptionIcon,
  Assignment as AssignmentIcon,
  AccountBalance as AccountBalanceIcon,
  Security as SecurityIcon,
  Business as BusinessIcon,
  Favorite as FavoriteIcon,
  Folder as FolderIcon,
} from '@mui/icons-material';

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  route: string;
}

export const categories: Category[] = [
  {
    id: 'payslips',
    title: 'Lohnabrechnungen',
    description: 'Monatliche Gehaltsabrechnungen und Lohnsteuerbescheinigungen',
    icon: ReceiptIcon,
    route: 'payslips'
  },
  {
    id: 'receipts',
    title: 'Rechnungen & Belege',
    description: 'Quittungen, Rechnungen und andere Ausgabenbelege',
    icon: DescriptionIcon,
    route: 'receipts'
  },
  {
    id: 'contracts',
    title: 'Verträge',
    description: 'Arbeitsverträge, Mietverträge und andere wichtige Dokumente',
    icon: AssignmentIcon,
    route: 'contracts'
  },
  {
    id: 'bank-statements',
    title: 'Kontoauszüge',
    description: 'Monatliche Kontoauszüge und Kreditkartenabrechnungen',
    icon: AccountBalanceIcon,
    route: 'bank-statements'
  },
  {
    id: 'insurance',
    title: 'Versicherungen',
    description: 'Versicherungspolicen und Beitragsbescheinigungen',
    icon: SecurityIcon,
    route: 'insurance'
  },
  {
    id: 'other',
    title: 'Sonstiges',
    description: 'Weitere relevante Dokumente und Unterlagen',
    icon: FolderIcon,
    route: 'other'
  }
]; 