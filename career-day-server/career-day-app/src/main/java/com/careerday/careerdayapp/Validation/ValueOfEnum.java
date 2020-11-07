package com.careerday.careerdayapp.ValidationUtils;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.lang.annotation.*;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE })
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = ValueOfEnumValidator.class)
@NotNull(message="Value cannot be null")
@ReportAsSingleViolation
public @interface ValueOfEnum {
    Class<? extends Enum<?>> enumClass();

    String message() default "Value must be any of enum {enumClass}";
	
	Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default{};
}