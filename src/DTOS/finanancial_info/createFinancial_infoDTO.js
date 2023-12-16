import financialInfoScheme from "../../validationSchemes/financial_infoScheme.js";
import { ERRORS } from "../../utils/constants.js";

export default class creatFinancial_infoDTO {
  constructor(organization_id, cbu, alias, mp_link) {
    this.organization_id = organization_id;
    this.cbu = cbu;
    this.alias = alias;
    this.mp_link = mp_link;
  }

  static fromRequest(req) {
    const { error, value } = financialInfoScheme.validate(req.body);
    if (error) {
      if (error) {
        const errorMessages = error.details.map((err) => {
          if (err.type === "any.required") {
            return `El campo ${err.context.key} es obligatorio`;
          }
          return err.message;
        });

        const infError = {
          ...ERRORS.ValidationError,
          message: errorMessages,
        };

        throw infError;
      }
    }

    return new creatFinancial_infoDTO(
      value.organization_id,
      value.cbu,
      value.alias,
      value.mp_link
    );
  }
}
