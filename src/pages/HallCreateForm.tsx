import { createHall } from "@/api/hallAPI";
import { routes } from "@/routes";
import { hallValidation } from "@/utils/zod-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const HallCreateForm = () => {
  const navigate = useNavigate();
  
  type HallValidationType = z.infer<typeof hallValidation>;
  const formMethods = useForm<HallValidationType>({
    resolver: zodResolver(hallValidation),
    mode: "onBlur",
    defaultValues: {
      name: "",
      rows: 0,
      cols: 0,
      capacity: 0,
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid, errors },
  } = formMethods;

  const rows = watch("rows");
  const cols = watch("cols");

  useEffect(() => {
    const parsedRows = parseInt(rows as unknown as string) || 0;
    const parsedCols = parseInt(cols as unknown as string) || 0;
    setValue("capacity", parsedRows * parsedCols);
  }, [rows, cols, setValue]);

  const onSubmit = async (data: HallValidationType) => {
    try {
      await createHall(data);
      navigate(routes.PRIVATE.HALLS);
    } catch (error) {
      console.log("hall create error");
      
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      elevation={3}
      sx={{
        padding: 4,
        ml: 6,
        maxWidth: 400,
        width: "100%",
        bgcolor: "background.paper",
        color: "text.primary",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Create Hall
      </Typography>

      <Box
        sx={{
          color: "text.primary",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 2,
        }}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="rows"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Rows"
              type="number"
              variant="outlined"
              error={!!errors.rows}
              helperText={errors.rows?.message}
              fullWidth
              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} // Parse to number
            />
          )}
        />
        <Controller
          name="cols"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Cols"
              type="number"
              variant="outlined"
              error={!!errors.cols}
              helperText={errors.cols?.message}
              fullWidth
              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} // Parse to number
            />
          )}
        />
        <Controller
          name="capacity"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Capacity"
              type="number"
              variant="outlined"
              disabled
              fullWidth
            />
          )}
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isValid}
        sx={{
          mt: 3,
          width: "100%",
        }}
      >
        Create
      </Button>
    </Paper>
  );
};

export default HallCreateForm;
