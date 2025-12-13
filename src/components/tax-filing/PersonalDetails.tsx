import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const BRAND_GREEN = '#32CE69';
const ACTIVE_BLUE = '#3B82F6';
const INACTIVE_COLOR = '#475569';
const ERROR_RED = '#EF4444';

interface PersonalData {
  salutation: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  occupation: string;
}

interface AddressData {
  residenceInGermany: boolean;
  postalCode: string;
  city: string;
  street: string;
  number: string;
  phoneNumber: string;
}

interface FamilyData {
  maritalStatus: string;
  children: number;
}

interface PreviousTaxData {
  previousYear: string;
  previousAmount: number;
}

interface ReligionData {
  religion: string;
}

interface DisabilityData {
  hasDisability: boolean;
  careLevel: string;
  hasSurvivorBenefits: boolean;
}

const PersonalDetails: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['personal', 'address', 'disability']);
  
  const [personalData, setPersonalData] = useState<PersonalData>({
    salutation: 'Herr',
    firstName: 'Félix',
    lastName: 'Lick',
    birthDate: '2001-11-02',
    occupation: 'Venture development',
  });

  const [addressData, setAddressData] = useState<AddressData>({
    residenceInGermany: true,
    postalCode: '10245',
    city: 'Berlin',
    street: 'Bossestr.',
    number: '7M',
    phoneNumber: '+49 171 8453356',
  });

  const [familyData, setFamilyData] = useState<FamilyData>({
    maritalStatus: '',
    children: 0,
  });

  const [previousTaxData, setPreviousTaxData] = useState<PreviousTaxData>({
    previousYear: '',
    previousAmount: 0,
  });

  const [religionData, setReligionData] = useState<ReligionData>({
    religion: '',
  });

  const [disabilityData, setDisabilityData] = useState<DisabilityData>({
    hasDisability: false,
    careLevel: '',
    hasSurvivorBenefits: false,
  });

  const handleSectionToggle = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const isSectionComplete = (section: string): boolean => {
    switch (section) {
      case 'personal':
        return !!(personalData.firstName && personalData.lastName && personalData.birthDate);
      case 'address':
        return !!(addressData.postalCode && addressData.city && addressData.street && addressData.number);
      case 'family':
        return !!(familyData.maritalStatus !== '');
      case 'previousTax':
        return !!(previousTaxData.previousYear);
      case 'religion':
        return !!(religionData.religion !== '');
      case 'disability':
        return true; // Always complete if answered
      default:
        return false;
    }
  };

  const renderSectionIndicator = (isComplete: boolean) => (
    <Box
      sx={{
        width: 4,
        height: '100%',
        bgcolor: isComplete ? BRAND_GREEN : ERROR_RED,
        borderRadius: '2px',
        mr: 2,
      }}
    />
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Félix
        </Typography>
        <IconButton
          onClick={() => {
            // Handle delete
          }}
          sx={{ color: INACTIVE_COLOR }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      {/* Info Text */}
      <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mb: 4, lineHeight: 1.6 }}>
        Ihre persönlichen Daten wie zum Beispiel der Familienstand, die Religionszugehörigkeit oder das Alter werden für eine korr{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      {/* Persönliche Angaben */}
      <Box sx={{ mb: 2 }}>
        <Accordion
          expanded={expandedSections.includes('personal')}
          onChange={() => handleSectionToggle('personal')}
          sx={{
            boxShadow: 'none',
            border: '1px solid #E2E8F0',
            borderRadius: 2,
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
          }}
        >
          <AccordionSummary
            expandIcon={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!expandedSections.includes('personal')) {
                      handleSectionToggle('personal');
                    }
                  }}
                  sx={{ textTransform: 'none', color: ACTIVE_BLUE }}
                >
                  ändern
                </Button>
                {expandedSections.includes('personal') ? (
                  <ExpandLessIcon sx={{ color: INACTIVE_COLOR }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: INACTIVE_COLOR }} />
                )}
              </Box>
            }
            sx={{
              px: 2,
              py: 1.5,
              '&.Mui-expanded': { minHeight: 56 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {renderSectionIndicator(isSectionComplete('personal'))}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#1E293B', mb: 0.5 }}>
                  Persönliche Angaben
                </Typography>
                {!expandedSections.includes('personal') && isSectionComplete('personal') && (
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto auto', gap: 2, mt: 1 }}>
                    <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                      {personalData.salutation}
                    </Typography>
                    <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                      {personalData.firstName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                      {personalData.lastName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                      {personalData.birthDate ? new Date(personalData.birthDate).toLocaleDateString('de-DE') : ''}
                    </Typography>
                    <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                      {personalData.occupation}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2, pb: 3, pt: 0 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Anrede</InputLabel>
                <Select
                  value={personalData.salutation}
                  label="Anrede"
                  onChange={(e) => setPersonalData({ ...personalData, salutation: e.target.value })}
                >
                  <MenuItem value="Herr">Herr</MenuItem>
                  <MenuItem value="Frau">Frau</MenuItem>
                  <MenuItem value="Divers">Divers</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Vorname"
                value={personalData.firstName}
                onChange={(e) => setPersonalData({ ...personalData, firstName: e.target.value })}
                fullWidth
              />
              <TextField
                label="Nachname"
                value={personalData.lastName}
                onChange={(e) => setPersonalData({ ...personalData, lastName: e.target.value })}
                fullWidth
              />
              <TextField
                label="Geburtsdatum"
                type="date"
                value={personalData.birthDate}
                onChange={(e) => setPersonalData({ ...personalData, birthDate: e.target.value })}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Beruf / Tätigkeit"
                value={personalData.occupation}
                onChange={(e) => setPersonalData({ ...personalData, occupation: e.target.value })}
                fullWidth
                sx={{ gridColumn: '1 / -1' }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Aktuelle Adresse & Kontaktdaten */}
      <Box sx={{ mb: 2 }}>
        <Accordion
          expanded={expandedSections.includes('address')}
          onChange={() => handleSectionToggle('address')}
          sx={{
            boxShadow: 'none',
            border: '1px solid #E2E8F0',
            borderRadius: 2,
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
          }}
        >
          <AccordionSummary
            expandIcon={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!expandedSections.includes('address')) {
                      handleSectionToggle('address');
                    }
                  }}
                  sx={{ textTransform: 'none', color: ACTIVE_BLUE }}
                >
                  ändern
                </Button>
                {expandedSections.includes('address') ? (
                  <ExpandLessIcon sx={{ color: INACTIVE_COLOR }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: INACTIVE_COLOR }} />
                )}
              </Box>
            }
            sx={{
              px: 2,
              py: 1.5,
              '&.Mui-expanded': { minHeight: 56 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {renderSectionIndicator(isSectionComplete('address'))}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#1E293B', mb: 0.5 }}>
                  Aktuelle Adresse & Kontaktdaten
                </Typography>
                {!expandedSections.includes('address') && isSectionComplete('address') && (
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto auto auto', gap: 2, mt: 1 }}>
                    <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                      {addressData.residenceInGermany ? 'Ja' : 'Nein'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                      {addressData.postalCode}
                    </Typography>
                    <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                      {addressData.city}
                    </Typography>
                    <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                      {addressData.street}
                    </Typography>
                    <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                      {addressData.number}
                    </Typography>
                    <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                      {addressData.phoneNumber}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2, pb: 3, pt: 0 }}>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B', mb: 1 }}>
                  Wohnsitz in Deutschland?
                </Typography>
                <RadioGroup
                  row
                  value={addressData.residenceInGermany ? 'yes' : 'no'}
                  onChange={(e) =>
                    setAddressData({ ...addressData, residenceInGermany: e.target.value === 'yes' })
                  }
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                    label="Ja"
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                    label="Nein"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField
                  label="Postleitzahl"
                  value={addressData.postalCode}
                  onChange={(e) => setAddressData({ ...addressData, postalCode: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Ort"
                  value={addressData.city}
                  onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Straße"
                  value={addressData.street}
                  onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Nr."
                  value={addressData.number}
                  onChange={(e) => setAddressData({ ...addressData, number: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Telefonnummer"
                  value={addressData.phoneNumber}
                  onChange={(e) => setAddressData({ ...addressData, phoneNumber: e.target.value })}
                  fullWidth
                  sx={{ gridColumn: '1 / -1' }}
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Familienstand & Kinder */}
      <Box sx={{ mb: 2 }}>
        <Accordion
          expanded={expandedSections.includes('family')}
          onChange={() => handleSectionToggle('family')}
          sx={{
            boxShadow: 'none',
            border: '1px solid #E2E8F0',
            borderRadius: 2,
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
          }}
        >
          <AccordionSummary
            expandIcon={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!expandedSections.includes('family')) {
                      handleSectionToggle('family');
                    }
                  }}
                  sx={{ textTransform: 'none', color: ACTIVE_BLUE }}
                >
                  ändern
                </Button>
                {expandedSections.includes('family') ? (
                  <ExpandLessIcon sx={{ color: INACTIVE_COLOR }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: INACTIVE_COLOR }} />
                )}
              </Box>
            }
            sx={{
              px: 2,
              py: 1.5,
              '&.Mui-expanded': { minHeight: 56 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {renderSectionIndicator(isSectionComplete('family'))}
              {!isSectionComplete('family') && (
                <WarningIcon sx={{ color: ERROR_RED, fontSize: 20, mr: 1 }} />
              )}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#1E293B', mb: 0.5 }}>
                  Familienstand & Kinder
                </Typography>
                {!expandedSections.includes('family') && !isSectionComplete('family') && (
                  <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mt: 0.5 }}>
                    keine Angaben
                  </Typography>
                )}
                {!expandedSections.includes('family') && isSectionComplete('family') && (
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: 2, mt: 1 }}>
                    <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                      Familienstand: {familyData.maritalStatus}
                    </Typography>
                    <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                      Kinder: {familyData.children}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2, pb: 3, pt: 0 }}>
            <Box sx={{ mt: 2 }}>
              {familyData.maritalStatus === '' ? (
                <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mb: 3 }}>
                  keine Angaben
                </Typography>
              ) : (
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Familienstand</InputLabel>
                    <Select
                      value={familyData.maritalStatus}
                      label="Familienstand"
                      onChange={(e) => setFamilyData({ ...familyData, maritalStatus: e.target.value })}
                    >
                      <MenuItem value="ledig">Ledig</MenuItem>
                      <MenuItem value="verheiratet">Verheiratet</MenuItem>
                      <MenuItem value="verwitwet">Verwitwet</MenuItem>
                      <MenuItem value="geschieden">Geschieden</MenuItem>
                      <MenuItem value="eingetragene-partnerschaft">Eingetragene Partnerschaft</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Anzahl Kinder"
                    type="number"
                    value={familyData.children}
                    onChange={(e) => setFamilyData({ ...familyData, children: parseInt(e.target.value) || 0 })}
                    fullWidth
                  />
                </Box>
              )}
              {familyData.maritalStatus === '' && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setFamilyData({ maritalStatus: 'ledig', children: 0 });
                    handleSectionToggle('family');
                  }}
                  sx={{
                    borderColor: ACTIVE_BLUE,
                    color: ACTIVE_BLUE,
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#2563EB',
                      bgcolor: '#EFF6FF',
                    },
                  }}
                >
                  Angaben hinzufügen
                </Button>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Vorherige Steuererklärung */}
      <Box sx={{ mb: 2 }}>
        <Accordion
          expanded={expandedSections.includes('previousTax')}
          onChange={() => handleSectionToggle('previousTax')}
          sx={{
            boxShadow: 'none',
            border: '1px solid #E2E8F0',
            borderRadius: 2,
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
          }}
        >
          <AccordionSummary
            expandIcon={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!expandedSections.includes('previousTax')) {
                      handleSectionToggle('previousTax');
                    }
                  }}
                  sx={{ textTransform: 'none', color: ACTIVE_BLUE }}
                >
                  ändern
                </Button>
                {expandedSections.includes('previousTax') ? (
                  <ExpandLessIcon sx={{ color: INACTIVE_COLOR }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: INACTIVE_COLOR }} />
                )}
              </Box>
            }
            sx={{
              px: 2,
              py: 1.5,
              '&.Mui-expanded': { minHeight: 56 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {renderSectionIndicator(isSectionComplete('previousTax'))}
              {!isSectionComplete('previousTax') && (
                <WarningIcon sx={{ color: ERROR_RED, fontSize: 20, mr: 1 }} />
              )}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#1E293B', mb: 0.5 }}>
                  Vorherige Steuererklärung
                </Typography>
                {!expandedSections.includes('previousTax') && !isSectionComplete('previousTax') && (
                  <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mt: 0.5 }}>
                    keine Angaben
                  </Typography>
                )}
                {!expandedSections.includes('previousTax') && isSectionComplete('previousTax') && (
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: 2, mt: 1 }}>
                    <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                      Jahr: {previousTaxData.previousYear}
                    </Typography>
                    <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                      Betrag: {previousTaxData.previousAmount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2, pb: 3, pt: 0 }}>
            <Box sx={{ mt: 2 }}>
              {previousTaxData.previousYear === '' ? (
                <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mb: 3 }}>
                  keine Angaben
                </Typography>
              ) : (
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <TextField
                    label="Jahr der vorherigen Steuererklärung"
                    type="number"
                    value={previousTaxData.previousYear}
                    onChange={(e) => setPreviousTaxData({ ...previousTaxData, previousYear: e.target.value })}
                    fullWidth
                  />
                  <TextField
                    label="Betrag"
                    type="number"
                    value={previousTaxData.previousAmount}
                    onChange={(e) =>
                      setPreviousTaxData({ ...previousTaxData, previousAmount: parseFloat(e.target.value) || 0 })
                    }
                    fullWidth
                    InputProps={{
                      endAdornment: <Typography sx={{ color: INACTIVE_COLOR, mr: 1 }}>€</Typography>,
                    }}
                  />
                </Box>
              )}
              {previousTaxData.previousYear === '' && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    const currentYear = new Date().getFullYear();
                    setPreviousTaxData({ previousYear: (currentYear - 1).toString(), previousAmount: 0 });
                    handleSectionToggle('previousTax');
                  }}
                  sx={{
                    borderColor: ACTIVE_BLUE,
                    color: ACTIVE_BLUE,
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#2563EB',
                      bgcolor: '#EFF6FF',
                    },
                  }}
                >
                  Angaben hinzufügen
                </Button>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Religion */}
      <Box sx={{ mb: 2 }}>
        <Accordion
          expanded={expandedSections.includes('religion')}
          onChange={() => handleSectionToggle('religion')}
          sx={{
            boxShadow: 'none',
            border: '1px solid #E2E8F0',
            borderRadius: 2,
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
          }}
        >
          <AccordionSummary
            expandIcon={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!expandedSections.includes('religion')) {
                      handleSectionToggle('religion');
                    }
                  }}
                  sx={{ textTransform: 'none', color: ACTIVE_BLUE }}
                >
                  ändern
                </Button>
                {expandedSections.includes('religion') ? (
                  <ExpandLessIcon sx={{ color: INACTIVE_COLOR }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: INACTIVE_COLOR }} />
                )}
              </Box>
            }
            sx={{
              px: 2,
              py: 1.5,
              '&.Mui-expanded': { minHeight: 56 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {renderSectionIndicator(isSectionComplete('religion'))}
              {!isSectionComplete('religion') && (
                <WarningIcon sx={{ color: ERROR_RED, fontSize: 20, mr: 1 }} />
              )}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#1E293B', mb: 0.5 }}>
                  Religion
                </Typography>
                {!expandedSections.includes('religion') && !isSectionComplete('religion') && (
                  <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mt: 0.5 }}>
                    keine Angaben
                  </Typography>
                )}
                {!expandedSections.includes('religion') && isSectionComplete('religion') && (
                  <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mt: 0.5 }}>
                    {religionData.religion}
                  </Typography>
                )}
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2, pb: 3, pt: 0 }}>
            <Box sx={{ mt: 2 }}>
              {religionData.religion === '' ? (
                <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mb: 3 }}>
                  keine Angaben
                </Typography>
              ) : (
                <FormControl fullWidth>
                  <InputLabel>Religion</InputLabel>
                  <Select
                    value={religionData.religion}
                    label="Religion"
                    onChange={(e) => setReligionData({ religion: e.target.value })}
                  >
                    <MenuItem value="evangelisch">Evangelisch</MenuItem>
                    <MenuItem value="katholisch">Katholisch</MenuItem>
                    <MenuItem value="islamisch">Islamisch</MenuItem>
                    <MenuItem value="jüdisch">Jüdisch</MenuItem>
                    <MenuItem value="andere">Andere</MenuItem>
                    <MenuItem value="keine">Keine</MenuItem>
                  </Select>
                </FormControl>
              )}
              {religionData.religion === '' && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setReligionData({ religion: 'keine' });
                    handleSectionToggle('religion');
                  }}
                  sx={{
                    borderColor: ACTIVE_BLUE,
                    color: ACTIVE_BLUE,
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#2563EB',
                      bgcolor: '#EFF6FF',
                    },
                  }}
                >
                  Angaben hinzufügen
                </Button>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Behinderung & Hinterbliebenenbezüge */}
      <Box sx={{ mb: 2 }}>
        <Accordion
          expanded={expandedSections.includes('disability')}
          onChange={() => handleSectionToggle('disability')}
          sx={{
            boxShadow: 'none',
            border: '1px solid #E2E8F0',
            borderRadius: 2,
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
          }}
        >
          <AccordionSummary
            expandIcon={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!expandedSections.includes('disability')) {
                      handleSectionToggle('disability');
                    }
                  }}
                  sx={{ textTransform: 'none', color: ACTIVE_BLUE }}
                >
                  ändern
                </Button>
                {expandedSections.includes('disability') ? (
                  <ExpandLessIcon sx={{ color: INACTIVE_COLOR }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: INACTIVE_COLOR }} />
                )}
              </Box>
            }
            sx={{
              px: 2,
              py: 1.5,
              '&.Mui-expanded': { minHeight: 56 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {renderSectionIndicator(isSectionComplete('disability'))}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#1E293B', mb: 0.5 }}>
                  Behinderung & Hinterbliebenenbezüge
                </Typography>
                {!expandedSections.includes('disability') && isSectionComplete('disability') && (
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: 2, mt: 1 }}>
                    <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                      Behinderung / Pflegegrad: {disabilityData.hasDisability ? 'Ja' : 'Nein'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                      Hinterbliebenenbezüge: {disabilityData.hasSurvivorBenefits ? 'Ja' : 'Nein'}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2, pb: 3, pt: 0 }}>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B', mb: 1 }}>
                  Behinderung / Pflegegrad
                </Typography>
                <RadioGroup
                  row
                  value={disabilityData.hasDisability ? 'yes' : 'no'}
                  onChange={(e) =>
                    setDisabilityData({ ...disabilityData, hasDisability: e.target.value === 'yes' })
                  }
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                    label="Ja"
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                    label="Nein"
                  />
                </RadioGroup>
                {disabilityData.hasDisability && (
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Pflegegrad</InputLabel>
                    <Select
                      value={disabilityData.careLevel}
                      label="Pflegegrad"
                      onChange={(e) => setDisabilityData({ ...disabilityData, careLevel: e.target.value })}
                    >
                      <MenuItem value="1">Pflegegrad 1</MenuItem>
                      <MenuItem value="2">Pflegegrad 2</MenuItem>
                      <MenuItem value="3">Pflegegrad 3</MenuItem>
                      <MenuItem value="4">Pflegegrad 4</MenuItem>
                      <MenuItem value="5">Pflegegrad 5</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B', mb: 1 }}>
                  Hinterbliebenenbezüge
                </Typography>
                <RadioGroup
                  row
                  value={disabilityData.hasSurvivorBenefits ? 'yes' : 'no'}
                  onChange={(e) =>
                    setDisabilityData({ ...disabilityData, hasSurvivorBenefits: e.target.value === 'yes' })
                  }
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                    label="Ja"
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                    label="Nein"
                  />
                </RadioGroup>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default PersonalDetails;

