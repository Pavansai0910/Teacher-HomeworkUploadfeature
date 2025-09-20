  import translate from "translate";

  export const handleTranslate = async (data, lang) => {
          try {
            const translationResult = await translate(data, { to: lang });
            return translationResult
            
          } catch (error) {
            console.error("Translation error:", error);
          }
        };
      