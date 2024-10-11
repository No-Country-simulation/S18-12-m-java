package com.Kosten.Api_Rest.controllers;

import com.Kosten.Api_Rest.dto.ExtendedBaseResponse;
import com.Kosten.Api_Rest.dto.images.ImageResponseDTO;
import com.Kosten.Api_Rest.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class ImagesController {

    private final ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<ExtendedBaseResponse<ImageResponseDTO>> uploadImage(@RequestParam("image") MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("No se ha seleccionado ningún archivo");
        }

        try {

            var imageFile = imageService.uploadImage(file);

            return ResponseEntity
                    .status(201)
                    .body(imageFile);

        } catch (Exception e) {
            throw new RuntimeException("No se ha podido subir la imagen");
        }
    }

}