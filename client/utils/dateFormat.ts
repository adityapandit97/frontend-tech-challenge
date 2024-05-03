export function formatDate(startDate) {
    // Create an array of month names
    const monthNames = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];
  
    // Get the day, month, and year from the date object
    let date = new Date(startDate)
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    // Format the date as "DD MMMM YYYY"
    const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
  
    return formattedDate;
  }