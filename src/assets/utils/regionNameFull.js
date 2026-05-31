export const regionNameFull=(name)=>{
  const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
  return regionNamesInEnglish.of(`${name}`);
}
