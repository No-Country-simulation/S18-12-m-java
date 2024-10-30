/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { destinationCerroPenitentes } from "./tourDestinationData";
import { Box, Grid2, Typography } from "@mui/material";
import { customPalette } from "../../../customStyle";
import { useParams } from "react-router-dom";
export default function TourDestinationDetail() {
  const { id } = useParams();

  const [isId, setIsId] = useState(false);

  useEffect(() => {
    id == destinationCerroPenitentes.row0.id && setIsId(true);
  }, [id]);

  const RowGridText = ({ title, text }) => (
    <Grid2
      item
      size={{ xs: 12, sm: 6 }}
      sx={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "7rem", gap: "1rem" }}
    >
      <Typography variant="titleH2">{title}</Typography>

      {text.split("_").map((part, index) => (
        <Typography key={index} variant="p">
          {part}
        </Typography>
      ))}
    </Grid2>
  );

  const RowGridImg = ({ img, title }) => (
    <Grid2 item size={{ xs: 12, sm: 6 }} sx={{ objectFit: "cover", overflow: "clip", display:'flex', justifyContent:'center' }}>
      <img src={img} alt={title} style={{ height: "100%", width:"fit-content" }} />
    </Grid2>
  );

  const RowGridContainer = ({ children }) => (
    <Grid2 container direction={{ xs: "column", sm: "row" }}>
      {children}
    </Grid2>
  );

  return (
    <>
      {isId ? (
        <Box>

          {/* Row 0 */}
          <Box
            sx={{
              backgroundImage: `url(${destinationCerroPenitentes.row0.imgBanner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "280px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="titleXL"
              sx={{
                color: customPalette.text.light,
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))",
              }}
            >
              {destinationCerroPenitentes.row0.id}
            </Typography>
          </Box>

          {/* Row 1 */}
          <RowGridContainer>
            <RowGridText
              title={destinationCerroPenitentes.row1.title}
              text={destinationCerroPenitentes.row1.text}
            />
            <RowGridImg
              img={destinationCerroPenitentes.row1.imgRow}
              title={destinationCerroPenitentes.row1.title}
            />
          </RowGridContainer>

          {/* Row 2 */}
          <RowGridContainer>
            <RowGridImg
              img={destinationCerroPenitentes.row2.imgRow}
              title={destinationCerroPenitentes.row2.title}
            />
            <RowGridText
              title={destinationCerroPenitentes.row2.title}
              text={destinationCerroPenitentes.row2.text}
            />
          </RowGridContainer>

          {/* Row 3 */}
          <RowGridContainer>
            <RowGridText
              title={destinationCerroPenitentes.row3.title}
              text={destinationCerroPenitentes.row3.text}
            />
            <RowGridImg
              img={destinationCerroPenitentes.row3.imgRow}
              title={destinationCerroPenitentes.row3.title}
            />
          </RowGridContainer>
        </Box> 
      )
      :
      <Typography variant="titleXL">Página en construcción</Typography>
    }
    </>
  );
}
