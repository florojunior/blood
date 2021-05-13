import * as cpf from '@fnando/cpf';
import { parse, isBefore, getYear, isValid } from 'date-fns';

export const nameRules = {
  required: (v) => !!v || 'O campo nome precisa ser informado.',
  max: (v) =>
    (v && v.length <= 150) || 'Tamanho máximo do campo é de 150 caracteres.',
  optional: (v) =>
    !v ||
    (v && v.length <= 150) ||
    'Tamanho máximo do campo é de 150 caracteres.',
};

export const birthdateRules = {
  required: (v) => !!v || 'O campo data de nascimento precisa ser informado.',
};

export const emailRules = {
  required: (v) => !!v || 'O campo e-mail precisa ser informado.',
  validEmail: (v) =>
    /.+@.+\..+/.test(v) || 'O endereço de e-mail informado é inválido.',
  max: (v) =>
    (v && v.length <= 80) || 'Tamanho máximo do campo é de 80 caracteres.',
  min: (v) =>
    (v && v.length >= 5) || 'Tamanho mínimo do campo é de 5 caracteres.',
};

export const passwordRules = {
  required: (v) => !!v || 'O campo senha precisa ser informado.',
  min: (v) =>
    (v && v.length >= 8) || 'Tamanho mínimo da senha é de 8 caracteres.',
  max: (v) =>
    (v && v.length <= 30) || 'Tamanho máximo da senha é de 30 caracteres.',
};

export const passwordConfirmRules = {
  required: (v) =>
    !!v || 'O campo de confirmação de senha precisa ser informado.',
  matchPassword(password) {
    return (v) => v === password || 'Senhas não correspondem.';
  },
};

export const cpfRules = {
  required: (v) => !!v || 'O campo CPF precisa ser informado.',
  validCpf: (v) => cpf.isValid(v) || 'O CPF informado é inválido.',
};

export const rgRules = {
  required: (v) => !!v || 'O campo RG precisa ser informado.',
  min: (v) =>
    (v && v.length >= 8) || 'Tamanho mínimo do campo é de 8 caracteres.',
  max: (v) =>
    (v && v.length <= 20) || 'Tamanho máximo do campo é de 20 caracteres.',
};

export const hospitalRules = {
  required: (v) => !!v || 'O campo hospital precisa ser informado.',
};

export const radioGroupRules = {
  required: (v) => !!v || 'Uma opção deve ser selecionada.',
};

export const telephoneRules = {
  required: (v) => !!v || 'O campo telefone precisa ser informado.',
  max: (v) =>
    !v ||
    (v && v.length === 13) ||
    'O número de telefone informado é inválido.',
  maxExtraDigit: (v) =>
    (v && v.length === 14) || 'O número de telefone informado é inválido.',
};

export const professionalOccupationIdRules = {
  required: (v) =>
    !!v || 'O campo ocupação profissional precisa ser informado.',
};

export const professionalCouncilRules = {
  required: (v) =>
    (v.idconselho_profissional !== null &&
      v.descricao !== null &&
      v.ativo !== null) ||
    'O campo conselho profissional precisa ser informado.',
};

export const professionalCouncilNumberRules = {
  required: (v) =>
    !!v ||
    'O campo de registro do conselho profissional precisa ser informado.',
  max: (v) =>
    (v && v.length <= 30) || 'Tamanho máximo do campo é de 30 caracteres.',
};

export const hospitalRegistrationRules = {
  required: (v) => !!v || 'O campo matrícula precisa ser informado.',
  max: (v) =>
    (!!v && v.length <= 20) || 'Tamanho máximo do campo é de 20 caracteres.',
};

export const profileRules = {
  required: (v) => !!v || 'O campo perfil precisa ser informado.',
};

export const bedsRules = {
  required: (v) =>
    (v && v.length > 0) || 'A clinica deve ter pelo menos 1 leito.',
};

export const recaptchaRules = {
  required: (v) => !!v || 'O campo recaptcha precisa ser informado.',
};

export const medicalRecordRules = {
  required: (v) => !!v || 'O campo registro precisa ser informado.',
  max: (v) =>
    (!!v && v.length <= 20) || 'Tamanho máximo do campo é de 20 caracteres.',
};

export const genderRules = {
  required: (v) => !!v || 'O campo sexo precisa ser informado.',
};

export const motherRules = {
  required: (v) => !!v || 'O campo nome da mãe precisa ser informado.',
};

export const cellphoneRules = {
  required: (v) => !!v || 'O campo celular precisa ser informado.',
  max: (v) =>
    (v && v.length === 14) || 'O número de celular informado é inválido.',
};

export const birthplaceRules = {
  required: (v) => !!v || 'O campo naturalidade precisa ser informado.',
};

export const transfusionCancelObservationRules = {
  required: (v) => !!v || 'O campo de justificação precisa ser informado.',
};

const _parseDate = (date) =>
  date ? parse(date, 'dd/MM/yyyy', new Date()) : date;

export const dateRules = {
  isNotFutureDate: (value) =>
    (!!value && isBefore(_parseDate(value), new Date())) ||
    'Não pode ser uma data futura.',
  isValidDate: (value) =>
    (!!value && isValid(_parseDate(value))) || 'Data inválida.',
  isValidYear: (value) =>
    (!!value && getYear(_parseDate(value)) >= 1900) ||
    'Ano de nascimento inválido.',
  isYearFourDigits: (value) => {
    const yearDigitsAmmount = value
      ? getYear(_parseDate(value)).toString().length
      : value;

    return (!!value && yearDigitsAmmount === 4) || 'Ano inválido.';
  },
};

export const patientRules = {
  required: (v) => !!v || 'O campo paciente precisa ser informado.',
};

export const healthcareRules = {
  required: (v) => !!v || 'O campo convênios precisa ser informado.',
};

export const diagnosisRules = {
  required: (v) => !!v || 'O campo diagnóstico precisa ser informado.',
};

export const typesProcedureRules = {
  required: (v) => !!v || 'O campo tipo precisa ser informado.',
};

export const procedureObservationRules = {
  required: (v) => !!v || 'O campo observação precisa ser informado.',
};

export const typeTransfusionRules = {
  required: (v) =>{
    console.log(v);
    !!v ||
    'O campo de Tipo de Transfusão precisa ser informado'
  }
}

export const clinicRules = {
  required: (v) =>
    (!!v) || 'A clinica deve ser selecionada.',
};
    
export const bedsRequistion = {
  required: (v) =>
    (!!v) || 'O leito deve ser selecionado.',
}

export const weightRules = {
  required: (v) =>
    (!!v) || 'O peso deve ser informado.',
}

export const plateletsRules = {
  required: (v) =>
    (!!v) || 'As plaquetas devem ser informadas.',
}

export const hemoglobinRules = {
  required: (v) =>
    (!!v) || 'As hemoglobinas devem ser informadas.',
}

export const hematoctroRules = {
  required: (v) =>
    (!!v) || 'Os hematróctos devem ser informadas.',
}



