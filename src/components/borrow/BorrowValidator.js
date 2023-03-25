class BorrowValidator {
    validateTitle = (title) => {
        if (title.length === 0) {
            alert('제목을 입력해주세요.');
            return false;
        }
        return true;
    };

    validatePrice = (price) => {
        if (price.length === 0) {
            alert('가격을 입력해주세요.');
            return false;
        }
        if (!Number.isInteger(Number(price))) {
            alert('가격은 숫자만 입력이 가능합니다.');
            return false;
        }
        return true;
    };

    validateProduct = (product) => {
        if (product.length === 0) {
            alert('제품명을 입력해주세요.');
            return false;
        }
        return true;
    };

    validateStartDate = (startDate) => {
        const start = new Date(startDate);
        if (startDate.length === 0) {
            alert('시작 날짜를 선택해주세요.');
            return false;
        }
        if (!(start > new Date())) {
            alert('시작 날짜를 확인해주세요.');
            return false;
        }
        return true;
    };

    validateEndDate = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (!(start < end)) {
            alert('날짜를 확인해주세요.');
            return false;
        }
        return true;
    };

    validateContent = (content) => {
        if (content.length === 0) {
            alert('내용을 입력해주세요.');
            return false;
        }
        return true;
    };
}
export default BorrowValidator;
