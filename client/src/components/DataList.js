import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { ExcelRenderer } from 'react-excel-renderer';
import { Link, useNavigate, useParams } from 'react-router-dom';

const DataList = () => {
  const {id} = useParams();

  const inputRef = useRef(null);

  const [table, setTable] = useState([]);
  const exportRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    getData();

    // eslint-disable-next-line
  }, []);
    
  const getData = async() => {
    let condition = false;
    var array_check_box = [];
    const response = await axios.get(`http://localhost:5001/datas/${id}`);
    let length = response.data.canal_data.length;
    if(length > 4) {
      condition = true;
    }
    if(response.data.canal_data[0] !== undefined){
      for(let i = 0; i < length; i++){
        array_check_box.push(false)
      }
      exportRef.current = array_check_box;
      setTable(
        <div style={condition ? {overflowY: "scroll", height: "244px", marginBottom: "10px"} : {height: "244px", marginBottom: "10px"}}>
				  <table className='table is-bordered is-fullwidth mt-2' >
            <thead>
              <tr>
                <th className='has-text-centered'>No</th>
                <th className='has-text-centered'>Canal ID</th>
                <th className='has-text-centered'>Order No</th>
                <th className='has-text-centered'>Operation No</th>
                <th className='has-text-centered'>Water Level (m)</th>
                <th className='has-text-centered'>Depth Correction (m)</th>
                <th className='has-text-centered'>Bed Float (m)</th>
                <th className='has-text-centered'>Revision</th>
                <th className='has-text-centered'>Action</th>
                <th className='has-text-centered'>Export TXT</th>
              </tr>
            </thead>
            <tbody >
              {response.data.canal_data.map((data, index) => (
              	<tr key={data._id}>
              	  <td>{index + 1}</td>
              	  <td>{data.canal_id}</td>
              	  <td>{data.order_no}</td>
              	  <td>{data.operation_no}</td>
                  <td>{data.water_level}</td>
              	  <td>{data.depth_correction}</td>
              	  <td>{data.bed_float}</td>
                  <td>{data.revision}</td>
              	  <td className='has-text-centered'>
                    <Link 
				  						to={`viewDetailData/${data._id}`} 
				  						className='button is-success is-small mr-1 mb-1'
				  					>
				  						View
				  					</Link>
              	    <Link 
				  						to={`editData/${data._id}`} 
				  						className='button is-info is-small mr-1 mb-1'
				  					>
				  						Edit
				  					</Link>
              	    <button onClick={() => deleteData(data._id)} className='button is-danger is-small '>Delete</button>
              	  </td>
                  <td className='has-text-centered'>
                    <input
                      style={{width: "20px", height: "20px"}}
                      type="checkbox"
                      value={index}
                      onClick={(e) => handleExport(e)}/>
                  </td>
              	</tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    } else {
      setTable(<div></div>)
    }
  }

  const checkNum = (num) => {
    if(num < 10) {
      return parseFloat(num).toFixed(3);
    }else if(num >= 10 && num <= 100) {
      return parseFloat(num).toFixed(2);
    }else if(num >= 100 && num <= 1000) {
      return parseFloat(num).toFixed(1);
    }else {
      return num;
    }
  }

  const handleExport = (e) => {
    const { checked } = e.target;
    const { value } = e.target;
    if(checked === true){
      exportRef.current[value] = true;
    }else {
      exportRef.current[value] = false;
    }
  }

  const exportDataInfo = async () => {
    var content = "";
    var tableHead = "AUFNR       OPN MPNT        REVBUDAT   TERMINAL       NMEADOCDTMEAREAD         MDTXT                                   OC\n"
    var tableSubHead = "C12         C4  C12         NC3YYYYMMDD123456789012345XYYYYMMDD1234567890123456ABCDEFGHIJABCDEFGHIJABCDEFGHIJABCDEFGHIJXX\n"
    const response = await axios.get(`http://localhost:5001/datas/${id}`);
    let length = response.data.canal_data.length;
    let water_level;
    for(var i = 0; i < length; i++){
      if(exportRef.current[i] === false){
        continue;
      }
      let dataLength = response.data.canal_data[i].data.length;
      var order_no = ("000000000000" + String(response.data.canal_data[i].order_no)).slice(-12);
      var operation_no = ("0000" + String(response.data.canal_data[i].operation_no)).slice(-4);
      var measure_point = ("000000000000" + String(response.data.canal_data[i].measure_point)).slice(-12);
      var revision = ("000" + String(response.data.canal_data[i].revision)).slice(-3);
      var usv_code = (String(response.data.canal_data[i].usv_code) + "               ").slice(0, 15);
      var revision_real = response.data.canal_data[i].revision;
      var district_code = response.data.canal_data[i].district.code;
      var qc_date = response.data.canal_data[i].qc_date;
      var usv_code_real = response.data.canal_data[i].usv_code;
      for(var j = 0; j < dataLength; j++){
        var final_depth = parseFloat(response.data.canal_data[i].data[j].depth) + parseFloat(response.data.canal_data[i].tranducer) + parseFloat(response.data.canal_data[i].bed_float) - parseFloat(response.data.canal_data[i].depth_correction);
        var sta_distance = response.data.canal_data[i].data[j].sta_distance;
        var sta = response.data.canal_data[i].data[j].sta;
        if(sta_distance < 10){
          sta_distance = String("0"+sta_distance+"              ")
        }else{
          sta_distance = String(sta_distance+"              ")
        }
        if(response.data.canal_data[i].water_level < 0) {
          water_level = parseFloat(response.data.canal_data[i].water_level).toFixed(2)
        } else {
          water_level = parseFloat(response.data.canal_data[i].water_level).toFixed(3)
        }
        var canal_upper_width = checkNum(response.data.canal_data[i].canal_upper_width);
        var canal_bottom_width = checkNum(response.data.canal_data[i].canal_bottom_width);
        var mdtxt = ("S" + ("00000" + String(sta)).slice(-4) + "-" + String(water_level) + "-" + String(final_depth.toFixed(3)) + "-" + String(canal_upper_width) + "-" + String(canal_bottom_width) + "/" + String(response.data.canal_data[i].measure_date) + "                                        ").slice(0, 40);
        content += (`${order_no}${operation_no}${measure_point}${revision}${response.data.canal_data[i].qc_date}${usv_code}X${response.data.canal_data[i].measure_date}${sta_distance}${mdtxt}AX\n`)
      }
    }
    var fileData = tableHead + tableSubHead + content;
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    if(parseInt(revision_real) === 0) {
      link.download = `${district_code}-${qc_date}-${usv_code_real}.txt`;
    } else {
      link.download = `${district_code}-${qc_date}-${usv_code_real}-R${parseInt(revision_real)}.txt`;
    }
    link.href = url;
    link.click();
  }

	const deleteData = async(id) => {
		try {
			await axios.delete(`http://localhost:5001/data/${id}`);
			navigate(0);
		} catch (error) {
			console.log(error);
		}
	}

  const deleteAllData = async() => {
		try {
			await axios.delete(`http://localhost:5001/alldata/${id}`);
			navigate(0);
		} catch (error) {
			console.log(error);
		}
	}

  const handleClick = () => {
    inputRef.current.click();
  };

  const fileHandler = (e) => {
    let fileObj = e.target.files[0];
    
    ExcelRenderer(fileObj, async (err, resp) => {
      if(err){
        console.log(err);            
      }
      else{
        try{
          let data = [];
          let district_code;
          let length = resp.rows.length;
          for(var i = 1; i < length; i++){
            if(resp.rows[i][18] === "District Sungai Beyuku"){
              district_code = "3B01";
            }else if(resp.rows[i][18] === "District Sungai Penyabungan"){
              district_code = "3B03";
            }else if(resp.rows[i][18] === "District Padang Sugihan"){
              district_code = "3B02";
            }else if(resp.rows[i][18] === "District Simpang Tiga"){
              district_code = "3B04";
            }else if(resp.rows[i][18] === "District Kuala Lumpur"){
              district_code = "3A05";
            }else if(resp.rows[i][18] === "District Sungai Jelutung"){
              district_code = "3C01";
            }else if(resp.rows[i][18] === "District Bagan Rame"){
              district_code = "3C02";
            }else if(resp.rows[i][18] === "District Air Sugihan"){
              district_code = "3C03";
            }else if(resp.rows[i][18] === "District Simpang Heran"){
              district_code = "3C04";
            }else {
              district_code = "3C05";
            }
            data[i-1] = {
              "canal_id" : resp.rows[i][1],
              "dimensi" : {
                "panjang" : resp.rows[i][2],
                "lebar" : resp.rows[i][3],
                "tinggi" : resp.rows[i][4]
              },
              "order_no" : resp.rows[i][5],
              "operation_no" : resp.rows[i][6],
              "start" : resp.rows[i][7],
              "end" : resp.rows[i][8],
              "measure_point" : resp.rows[i][9],
              "water_level" : resp.rows[i][10],
              "depth_correction" : resp.rows[i][11],
              "bed_float" : resp.rows[i][12],
              "revision" : resp.rows[i][13],
              "operator" : resp.rows[i][14],
              "qc_date" : resp.rows[i][15],
              "measure_date" : resp.rows[i][16],
              "usv_code" : resp.rows[i][17],
              "district" : {
                "name" : resp.rows[i][18],
                "code" : district_code
              },
              "canal_upper_width" : resp.rows[i][19],
              "canal_bottom_width" : resp.rows[i][20],
              "canal_length" : resp.rows[i][21],
              "tranducer" : resp.rows[i][22],
              "lane": resp.rows[i][23]
            }
          }
          await axios.post(`http://localhost:5001/data/${id}`,{
            "canal_data" : data
          });
          navigate(0);
        }catch (error){
          console.log(error)
        }
      }
    });               
    
    }

  return (
    <div className="columns">
      <div className="column is-fullwidth">
        <p className='mt-2'>Report Parameters</p>
        {table}
        <div className='is-flex is-justify-content-space-between'>
          <span>
            <input
              style={{display: 'none'}}
              ref={inputRef}
              type="file" 
              onChange={fileHandler.bind(this)}
            />
            <button onClick={handleClick} className='button is-info mr-5'>Load From File</button>
            <Link to={`chartData/${id}`} className='button is-info mr-5'>Export to Graph</Link>
            <button onClick={() => exportDataInfo()} className='button is-info mr-5'>Export to txt</button>
          </span>
          <span>
            <Link to={`addData/${id}`} className='button is-success mr-5'>Add Order</Link>
            <button onClick={() => deleteAllData()} className='button is-danger'>Clear Order</button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default DataList;