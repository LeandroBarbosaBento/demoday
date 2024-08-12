import {Demoday} from "@/types"

export function getCurrentPhase(demoday: Demoday) {
    
    const today = new Date();

    function parseDate(dateString: string) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    const phaseOneInit = parseDate(demoday.phaseOneInit);
    const phaseOneEnd = parseDate(demoday.phaseOneEnd);
    const phaseTwoInit = parseDate(demoday.phaseTwoInit);
    const phaseTwoEnd = parseDate(demoday.phaseTwoEnd);
    const phaseThreeInit = parseDate(demoday.phaseThreeInit);
    const phaseThreeEnd = parseDate(demoday.phaseThreeEnd);
    const phaseFourInit = parseDate(demoday.phaseFourInit);
    const phaseFourEnd = parseDate(demoday.phaseFourEnd);

    if (today >= phaseOneInit && today <= phaseOneEnd) {
        return 1;
    } else if (today >= phaseTwoInit && today <= phaseTwoEnd) {
        return 2;
    } else if (today >= phaseThreeInit && today <= phaseThreeEnd) {
        return 3;
    } else if (today >= phaseFourInit && today <= phaseFourEnd) {
        return 4;
    } else {
        return 0; // Retorna 0 se não estiver em nenhuma fase
    }
}