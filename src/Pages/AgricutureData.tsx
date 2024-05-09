import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Modal, Select, MenuItem, TextField } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

interface AgricultureRecord {
  Domain: string;
  Area: string;
  Element: string;
  Item: string;
  Year: string;
  Unit: string;
  Value: string;
  Flag: string;
  'Flag Description': string;
}

const AgricultureData: React.FC = () => {
    const [data, setData] = useState<AgricultureRecord[]>([]);
    const [filteredData, setFilteredData] = useState<AgricultureRecord[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [openModal, setOpenModal] = useState(false);
    const [searchYear, setSearchYear] = useState<string>('');
    const [searchItem, setSearchItem] = useState<string>('');
    const [searchArea, setSearchArea] = useState<string>('');
  
  useEffect(() => {
    axios.get<AgricultureRecord[]>('http://localhost:5000/agriculture-data')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Filter data based on searchYear, searchItem, and searchArea
    let filtered = data.filter(record => {
      const yearMatch = record.Year.includes(searchYear);
      const itemMatch = record.Item.toLowerCase().includes(searchItem.toLowerCase());
      const areaMatch = record.Area.toLowerCase().includes(searchArea.toLowerCase());
      return yearMatch && itemMatch && areaMatch;
    });
    setFilteredData(filtered);
  }, [searchYear, searchItem, searchArea, data]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const maxButtons = 4;
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);
  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSearchYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchYear(event.target.value);
  };

  return (
    <div>
      <Box sx={{
        backgroundImage: `url('https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFncmljdWx0dXJlfGVufDB8fDB8fHww')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        padding: '10px',
        opacity: 0.7,
      }}>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 3, bgcolor: 'white', borderRadius: 10 ,mt:3}}>
          <Typography variant='h4'>Filter Your Search</Typography>
          <Button sx={{ backgroundColor: '#00FF7F', color: 'black', borderRadius: 5 }} onClick={handleOpenModal}><FilterAltIcon /> Filter</Button>
        </Box>
      
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: '#fff', boxShadow: 24, p: 4, borderRadius: 10 }}>
            <Typography variant='h6'textAlign={'center'}>Filter</Typography>
        <div style={{display:'flex',marginTop:'10px'}}>   <TextField
              label="Search Year"
              variant="outlined"
              value={searchYear}
              onChange={(e) => setSearchYear(e.target.value)}
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label="Search Item"
              variant="outlined"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              style={{ marginBottom: '10px',marginLeft:'10px' }}
            />
            <TextField
              label="Search Area"
              variant="outlined"
              value={searchArea}
              onChange={(e) => setSearchArea(e.target.value)}
              style={{ marginBottom: '10px' }}
            />
            </div> 
            <div style={{display: 'flex',justifyContent:'center',marginTop:'5px'}}>
    <Button onClick={handleCloseModal} variant="contained" color="primary">Apply Filters</Button>
</div>

          </Box>
        </Modal>
    


        <TableContainer component={Paper} sx={{mt:5}}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#00FF7F' }}>
                <TableCell sx={{ fontWeight: 'bold' ,fontSize:18}}>Domain</TableCell>
                <TableCell sx={{ fontWeight: 'bold' ,fontSize:18}}>Area</TableCell>
                <TableCell sx={{ fontWeight: 'bold' ,fontSize:18}}>Element</TableCell>
                <TableCell sx={{ fontWeight: 'bold' ,fontSize:18}}>Item</TableCell>
                <TableCell sx={{ fontWeight: 'bold' ,fontSize:18}}>Year</TableCell>
                <TableCell sx={{ fontWeight: 'bold' ,fontSize:18}}>Unit</TableCell>
                <TableCell sx={{ fontWeight: 'bold' ,fontSize:18}}>Value</TableCell> 
                <TableCell sx={{ fontWeight: 'bold' ,fontSize:18}}>Flag</TableCell>
                <TableCell sx={{ fontWeight: 'bold' ,fontSize:18}}>Flag Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.Domain}</TableCell>
                  <TableCell>{row.Area}</TableCell>
                  <TableCell>{row.Element}</TableCell>
                  <TableCell>{row.Item}</TableCell>
                  <TableCell>{row.Year}</TableCell>
                  <TableCell>{row.Unit}</TableCell>
                  <TableCell>{row.Value}</TableCell>
                  <TableCell>{row.Flag}</TableCell>
                  <TableCell>{row['Flag Description']}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {[...Array(endPage - startPage + 1)].map((_, index) => {
            const pageNumber = startPage + index;
            return (
              <button key={pageNumber} onClick={() => handlePageChange(pageNumber)} style={buttonStyle}>
                {pageNumber}
              </button>
            );
          })}
        </div>
      </Box>
    </div>
  );
};
const buttonStyle: React.CSSProperties = {
    backgroundColor: '#00FF7F',
    border: 'none',
    borderRadius: '20px',
    color: 'black',
    padding: '12px 22px',
    textDecoration: 'none',
    cursor: 'pointer', 
    marginRight:'5px'
  };
export default AgricultureData;
