export type ValidationError = {
  field: string;
  message: string;
};

export type ValidationResult = {
  valid: boolean;
  errors: ValidationError[];
};

export function validateString(value: unknown, fieldName: string): ValidationResult {
  const errors: ValidationError[] = [];
  
  if (value === undefined || value === null || value === '') {
    errors.push({ field: fieldName, message: `${fieldName} is required` });
    return { valid: false, errors };
  }
  
  if (typeof value !== 'string') {
    errors.push({ field: fieldName, message: `${fieldName} must be a string` });
    return { valid: false, errors };
  }
  
  return { valid: true, errors: [] };
}

export function validateNumber(value: unknown, fieldName: string): ValidationResult {
  const errors: ValidationError[] = [];
  
  if (value === undefined || value === null) {
    errors.push({ field: fieldName, message: `${fieldName} is required` });
    return { valid: false, errors };
  }
  
  if (typeof value !== 'number' || isNaN(value)) {
    errors.push({ field: fieldName, message: `${fieldName} must be a valid number` });
    return { valid: false, errors };
  }
  
  return { valid: true, errors: [] };
}

export function validateArray<T>(
  value: unknown, 
  fieldName: string, 
  itemValidator: (item: T) => ValidationResult
): ValidationResult {
  const errors: ValidationError[] = [];
  
  if (!Array.isArray(value)) {
    errors.push({ field: fieldName, message: `${fieldName} must be an array` });
    return { valid: false, errors };
  }
  
  for (let i = 0; i < value.length; i++) {
    const itemResult = itemValidator(value[i] as T);
    if (!itemResult.valid) {
      errors.push(...itemResult.errors.map(e => ({
        ...e,
        field: `${fieldName}[${i}].${e.field}`
      })));
    }
  }
  
  return { valid: errors.length === 0, errors };
}

export function validateObject(
  value: unknown, 
  fieldName: string, 
  validators: Record<string, (v: unknown) => ValidationResult>
): ValidationResult {
  const errors: ValidationError[] = [];
  
  if (value === undefined || value === null || typeof value !== 'object') {
    errors.push({ field: fieldName, message: `${fieldName} must be an object` });
    return { valid: false, errors };
  }
  
  for (const [key, validator] of Object.entries(validators)) {
    const result = validator((value as Record<string, unknown>)[key]);
    if (!result.valid) {
      errors.push(...result.errors.map(e => ({
        ...e,
        field: `${key}.${e.field}`
      })));
    }
  }
  
  return { valid: errors.length === 0, errors };
}