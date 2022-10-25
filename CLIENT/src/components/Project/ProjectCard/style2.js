export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 70vh;
    /* height: 74vh; */
    width:100%;
    overflow-y:hidden;
   
    @media screen and (min-width:601px) { 
        flex-direction: row;
        margin-bottom:3.5em;
        height:100%;        
  }
`;


export const TopContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 10vh;
    width:100%;
    margin: 1rem 0;
    @media screen and (min-width:601px) { 
      justify-content: unset;
  }
`;