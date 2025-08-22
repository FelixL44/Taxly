import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import YearStep from './tax-filing/YearStep';
import IncomeTypesStep from './tax-filing/IncomeTypesStep';
import DeductionsStep from './tax-filing/DeductionsStep';
import DocumentUploadStep from './tax-filing/DocumentUploadStep';
import ReviewStep from './tax-filing/ReviewStep';
import PreviewStep from './tax-filing/PreviewStep';

const steps = [
  'Steuerjahr',
  'Einkunftsarten',
  'Absetzungen',
  'Dokumente',
  'Vorschau & Berechnung',
  'Überprüfung',
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
}));

interface TaxFilingData {
  year: number;
  incomeTypes: string[];
  income: {
    [type: string]: number;
  };
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
}

const TaxFiling: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<TaxFilingData>({
    year: new Date().getFullYear(),
    incomeTypes: [],
    income: {},
    deductions: {
      homeOffice: { enabled: false, days: 0 },
      commuterAllowance: { enabled: false, distance: 0, days: 0 },
      childcare: { enabled: false, amount: 0 },
      craftsmen: { enabled: false, amount: 0 },
      donations: { enabled: false, amount: 0 },
      insurance: { enabled: false, amount: 0 },
    },
    uploadedFiles: [],
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    setError(null);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError(null);
  };

  const handleYearChange = (year: number) => {
    setFormData((prev) => ({ ...prev, year }));
  };

  const handleIncomeTypesChange = (incomeTypes: string[]) => {
    setFormData((prev) => ({ ...prev, incomeTypes }));
  };

  const handleIncomeChange = (income: TaxFilingData['income']) => {
    setFormData((prev) => ({ ...prev, income }));
  };

  const handleDeductionsChange = (deductions: TaxFilingData['deductions']) => {
    setFormData((prev) => ({ ...prev, deductions }));
  };

  const handleFilesChange = (files: TaxFilingData['uploadedFiles']) => {
    setFormData((prev) => ({ ...prev, uploadedFiles: files }));
  };

  const handleSubmit = async () => {
    try {
      // Here you would typically make an API call to submit the tax filing
      const response = await fetch('/api/tax-filings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Absenden der Steuererklärung');
      }

      // Redirect to success page or show success message
      window.location.href = '/tax-filings/success';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein unerwarteter Fehler ist aufgetreten');
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <YearStep
            year={formData.year}
            onYearChange={handleYearChange}
            onNext={handleNext}
            onError={setError}
          />
        );
      case 1:
        return (
          <IncomeTypesStep
            selectedTypes={formData.incomeTypes}
            onTypesChange={handleIncomeTypesChange}
            income={formData.income}
            onIncomeChange={handleIncomeChange}
            onNext={handleNext}
            onBack={handleBack}
            onError={setError}
          />
        );
      case 2:
        return (
          <DeductionsStep
            deductions={formData.deductions}
            onDeductionsChange={handleDeductionsChange}
            onNext={handleNext}
            onBack={handleBack}
            onError={setError}
          />
        );
      case 3:
        return (
          <DocumentUploadStep
            incomeTypes={formData.incomeTypes}
            deductions={formData.deductions}
            uploadedFiles={formData.uploadedFiles}
            onFilesChange={handleFilesChange}
            onNext={handleNext}
            onBack={handleBack}
            onError={setError}
          />
        );
      case 4:
        return (
          <PreviewStep
            year={formData.year}
            incomeTypes={formData.incomeTypes}
            income={formData.income}
            deductions={formData.deductions}
            uploadedFiles={formData.uploadedFiles}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <ReviewStep
            year={formData.year}
            incomeTypes={formData.incomeTypes}
            deductions={formData.deductions}
            uploadedFiles={formData.uploadedFiles}
            onSubmit={handleSubmit}
            onBack={handleBack}
            onError={setError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Neue Steuererklärung
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Füllen Sie die folgenden Schritte aus, um Ihre Steuererklärung zu erstellen.
        </Typography>

        <StyledPaper>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {renderStepContent(activeStep)}
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default TaxFiling; 