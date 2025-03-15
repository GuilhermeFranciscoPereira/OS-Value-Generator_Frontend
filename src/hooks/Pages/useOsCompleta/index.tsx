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

  const dateAndHourNotFormated = new Date(SearchByIdContent[0]?.dateAndHourOfCreationOS);
  const dateAndHourFormated = `${String(dateAndHourNotFormated.getDate()).padStart(2, '0')}/${String(dateAndHourNotFormated.getMonth() + 1).padStart(2, '0')}/${dateAndHourNotFormated.getFullYear()} - ${String(dateAndHourNotFormated.getHours()).padStart(2, '0')}:${String(dateAndHourNotFormated.getMinutes()).padStart(2, '0')}`;

  const workedTimeInMinutes: number = SearchByIdContent[0].workedTime;
  const hours: number = Math.floor(workedTimeInMinutes / 60);
  const minutes: number = workedTimeInMinutes % 60;
  let workedTime: string = '';
  if (hours > 0) {
    workedTime += `${hours} hora${hours > 1 ? 's' : ''}`;
  }
  if (minutes > 0) {
    if (workedTime) workedTime += ' e ';
    workedTime += `${minutes} minuto${minutes > 1 ? 's' : ''}`;
  }
  
  return { captureScreenshot, SearchByIdContent, dateAndHourFormated, workedTime };
}