package com.Kosten.Api_Rest.exception;

import com.Kosten.Api_Rest.dto.BaseResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<BaseResponse> handleIllegalArgumentException(IllegalArgumentException ex) {
        return new ResponseEntity<>(new BaseResponse(true, 400, "Error", ex.getMessage()), HttpStatus.BAD_REQUEST);
    }
}