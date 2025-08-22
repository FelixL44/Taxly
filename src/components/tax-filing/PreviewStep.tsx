import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
  Tooltip,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface PreviewStepProps {
  year: number;
  incomeTypes: string[];
  income: { [type: string]: number };
  deductions: {
    homeOffice: { enabled: boolean; days: number };
    commuterAllowance: { enabled: boolean; distance: number; days: number };
    childcare: { enabled: boolean; amount: number };
    craftsmen: { enabled: boolean; amount: number };
    donations: { enabled: boolean; amount: number };
    insurance: { enabled: boolean; amount: number };
  };
  uploadedFiles: Array<{
    category: string;
    file: File;
  }>;
  onNext: () => void;
  onBack: () => void;
}

// Hilfsfunktion für deutschen Einkommensteuertarif 2024
function berechneSteuer2024(einkommen: number): number {
  if (einkommen <= 11604) return 0;
  if (einkommen <= 17004) {
    // linearer Anstieg von 14% auf 24%
    const satz = 0.14 + (0.10 * (einkommen - 11605) / (17004 - 11605));
    return (einkommen - 11604) * satz;
  }
  if (einkommen <= 66759) {
    // linearer Anstieg von 24% auf 42%
    const satz = 0.24 + (0.18 * (einkommen - 17005) / (66759 - 17005));
    return (einkommen - 17004) * satz + berechneSteuer2024(17004);
  }
  if (einkommen <= 277825) {
    return (einkommen - 66759) * 0.42 + berechneSteuer2024(66759);
  }
  // ab 277826 €
  return (einkommen - 277825) * 0.45 + berechneSteuer2024(277825);
}

const PreviewStep: React.FC<PreviewStepProps> = ({
  year,
  incomeTypes,
  income,
  deductions,
  uploadedFiles,
  onNext,
  onBack,
}) => {
  // Beispielwerte für Name etc. (könnten später dynamisch werden)
  const name = 'Félix Lick';
  const address = 'Wittelsbacherstraße 14';
  const geburtsdatum = '02.11.2025';
  const steuerId = '541548156';

  // Fallbacks für deductions falls undefined (zur Sicherheit)
  const d = {
    ...{
      homeOffice: { enabled: false, days: 0 },
      commuterAllowance: { enabled: false, distance: 0, days: 0 },
      childcare: { enabled: false, amount: 0 },
      craftsmen: { enabled: false, amount: 0 },
      donations: { enabled: false, amount: 0 },
      insurance: { enabled: false, amount: 0 },
    },
    ...deductions,
  };

  // Dynamische Berechnung der Absetzungen
  const pendlerpauschale = d.commuterAllowance.enabled
    ? 0.3 * d.commuterAllowance.distance * d.commuterAllowance.days
    : 0;
  const homeOfficePauschale = d.homeOffice.enabled
    ? Math.min(6 * d.homeOffice.days, 1260)
    : 0;
  const kinderbetreuung = d.childcare.enabled ? d.childcare.amount * 0.6667 : 0; // 2/3 absetzbar
  const handwerker = d.craftsmen.enabled ? Math.min(d.craftsmen.amount * 0.2, 1200) : 0; // 20%, max 1200€
  const spenden = d.donations.enabled ? d.donations.amount : 0; // Annahme: voll absetzbar
  const versicherung = d.insurance.enabled ? d.insurance.amount : 0; // Annahme: voll absetzbar

  const gesamtAbzuege =
    pendlerpauschale +
    homeOfficePauschale +
    kinderbetreuung +
    handwerker +
    spenden +
    versicherung;

  // Einkommen dynamisch berechnen
  const einkommenList = incomeTypes.map(type => ({
    type,
    betrag: income[type] || 0
  }));
  const gesamtEinkommen = einkommenList.reduce((sum, e) => sum + e.betrag, 0);

  // Geleistete Steuerschuld für nichtselbstständige Arbeit + Kapitalvermögen
  const nichtselbstEinkommen = income['Nichtselbstständige Arbeit'] || 0;
  const kapitalEinkommen = income['Kapitalvermögen'] || 0;
  const geleisteteSteuerschuld = berechneSteuer2024(nichtselbstEinkommen) + kapitalEinkommen * 0.25;

  // Dummy-Berechnung für Vorschau
  const zuVersteuerndesEinkommen = Math.max(gesamtEinkommen - gesamtAbzuege, 0);
  const geschaetzteSteuerschuld = berechneSteuer2024(zuVersteuerndesEinkommen);
  const voraussichtlicheErstattung = geleisteteSteuerschuld - geschaetzteSteuerschuld;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Vorschau & Berechnung
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Überprüfung der Angaben
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Persönliche Daten
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Name:</Typography>
              <Typography>Adresse:</Typography>
              <Typography>Geburtsdatum:</Typography>
              <Typography>Steuer-ID:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">{name}</Typography>
              <Typography align="right">{address}</Typography>
              <Typography align="right">{geburtsdatum}</Typography>
              <Typography align="right">{steuerId}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Einkommen
          </Typography>
          <Grid container>
            <Grid item xs={8}>
              {einkommenList.map(e => (
                <Typography key={e.type}>{e.type}:</Typography>
              ))}
              <Typography fontWeight="bold">Gesamteinkommen:</Typography>
            </Grid>
            <Grid item xs={4}>
              {einkommenList.map(e => (
                <Typography key={e.type} align="right">{e.betrag.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</Typography>
              ))}
              <Typography align="right" fontWeight="bold">{gesamtEinkommen.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Abzüge & Ausgaben
          </Typography>
          <Grid container>
            <Grid item xs={8}>
              <Tooltip title="Es werden 0,30 € für jeden Kilometer Entfernung zum Arbeitsplatz erstattet." arrow><span><Typography>Pendlerpauschale:</Typography></span></Tooltip>
              <Tooltip title="Sie können 6 € für jeden Home-Office-Tag im Jahr absetzen(max. 1.260 €)" arrow><span><Typography>Home-Office-Pauschale:</Typography></span></Tooltip>
              <Tooltip title="2/3 der Kinderbetreuungskosten sind absetzbar" arrow><span><Typography>Kinderbetreuungskosten:</Typography></span></Tooltip>
              <Tooltip title="20% der Handwerkerkosten sind absetzbar, maximal 1.200 € pro Jahr" arrow><span><Typography>Handwerkerleistungen:</Typography></span></Tooltip>
              <Tooltip title="Spenden sind in voller Höhe absetzbar" arrow><span><Typography>Spenden:</Typography></span></Tooltip>
              <Tooltip title="Versicherungsbeiträge sind in voller Höhe absetzbar" arrow><span><Typography>Versicherungsbeiträge:</Typography></span></Tooltip>
              <Typography fontWeight="bold">Gesamte Abzüge:</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography align="right">{pendlerpauschale.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</Typography>
              <Typography align="right">{homeOfficePauschale.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</Typography>
              <Typography align="right">{kinderbetreuung.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</Typography>
              <Typography align="right">{handwerker.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</Typography>
              <Typography align="right">{spenden.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</Typography>
              <Typography align="right">{versicherung.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</Typography>
              <Typography align="right" fontWeight="bold">{gesamtAbzuege.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Alert severity="success" sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" color="success.main" gutterBottom sx={{ mb: 0, mr: 1 }}>
            Steuerberechnung (Schätzung)
          </Typography>
          <Tooltip
            title={<>
              <b>Zu versteuerndes Einkommen:</b> Summe aller Einkünfte abzüglich aller Abzüge.<br/>
              <b>Geleistete Steuerschuld:</b> Steuer, die bereits auf nichtselbstständige Arbeit (nach Tarif) und Kapitalvermögen (25%) gezahlt wurde.<br/>
              <b>Geschätzte Steuerschuld:</b> Steuer auf das zu versteuernde Einkommen nach deutschem Tarif.<br/>
              <b>Voraussichtliche Erstattung:</b> Geleistete Steuerschuld minus geschätzte Steuerschuld. Ein negativer Wert bedeutet Nachzahlung.
            </>}
            arrow
          >
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#eee', borderRadius: '50%', width: 24, height: 24, justifyContent: 'center', cursor: 'pointer' }}>
              <HelpOutlineIcon fontSize="small" sx={{ color: 'grey.600' }} />
            </Box>
          </Tooltip>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Dies ist eine vereinfachte Berechnung. Die finale Berechnung erfolgt durch Ihren Steuerberater.
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Grid container>
          <Grid item xs={8}>
            <Typography>Zu versteuerndes Einkommen:</Typography>
            <Typography>Geleistete Steuerschuld:</Typography>
            <Typography>Geschätzte Steuerschuld:</Typography>
            <Typography fontWeight="bold" color="success.main">Voraussichtliche Erstattung:</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="right">{zuVersteuerndesEinkommen.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</Typography>
            <Typography align="right">{geleisteteSteuerschuld.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</Typography>
            <Typography align="right">{geschaetzteSteuerschuld.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</Typography>
            <Typography align="right" fontWeight="bold" color="success.main">{voraussichtlicheErstattung.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</Typography>
          </Grid>
        </Grid>
      </Alert>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button variant="outlined" color="primary" onClick={onBack}>
          Zurück
        </Button>
        <Button variant="contained" color="primary" onClick={onNext}>
          Weiter
        </Button>
      </Box>
    </Box>
  );
};

export default PreviewStep; 