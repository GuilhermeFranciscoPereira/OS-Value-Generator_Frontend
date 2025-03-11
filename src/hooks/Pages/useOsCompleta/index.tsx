import { useSearchByIdContext } from "@/contexts/SearchByIdContext";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";

export default function useOsCompleta() {
  const { SearchByIdContent } = useSearchByIdContext();
  const router = useRouter();

  if (SearchByIdContent[0] == undefined) {
    router.push('/');
  }

  function captureScreenshot(elementId: string) {
    const content = document.getElementById(elementId);
    if (content) {
      html2canvas(content).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `ValorDeOS_Cliente_${SearchByIdContent[0].clientName}.png`;
        link.click();
      });
    }
  }

  const dateAndHourNotFormated = new Date(SearchByIdContent[0]?.dateAndHour);
  const dateAndHourFormated = `${String(dateAndHourNotFormated.getDate()).padStart(2, '0')}/${String(dateAndHourNotFormated.getMonth() + 1).padStart(2, '0')}/${dateAndHourNotFormated.getFullYear()} - ${String(dateAndHourNotFormated.getHours()).padStart(2, '0')}:${String(dateAndHourNotFormated.getMinutes()).padStart(2, '0')}`;

  return { captureScreenshot, SearchByIdContent, dateAndHourFormated };
}