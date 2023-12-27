import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditData = () => {
  const [canalid, setCanalId] = useState("");
  const [dimensiPanjang, setDimensiPanjang] = useState("");
  const [dimensiLebar, setDimensiLebar] = useState("");
  const [dimensiTinggi, setDimensiTinggi] = useState("");
  const [orderno, setOrderNo] = useState("");
  const [operationno, setOperationNo] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [measurepoint, setMeasurePoint] = useState("");
  const [waterlevel, setWaterLevel] = useState("");
  const [depthcorrection, setDepthCorrection] = useState("");
  const [bedfloat, setBedFloat] = useState("");
  const [revision, setRevision] = useState("");
  const [operator, setOperator] = useState("");
  const [qcdate, setQcDate] = useState("");
  const [measuredate, setMeasureDate] = useState("");
  const [usvcode, setUsvCode] = useState("");
  const [districtname, setDistrictName] = useState("District Sungai Beyuku")
  const [districtcode, setDistrictCode] = useState("3B01");
  const [canalupperwidth, setCanalUpperWidth] = useState("");
  const [canalbottomwidth, setCanalBottomWidth] = useState("");
  const [canallength, setCanalLength] = useState("");
  const [tranducer, setTranducer] = useState("");
  const [lane, setLane] = useState("1");
  
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    getData();

		// eslint-disable-next-line
  },[])

  const getData = async() => {
    const response = await axios.get(`http://localhost:5001/data/${id}`);
    setCanalId(response.data[0].canal_data[0].canal_id);
    setDimensiPanjang(response.data[0].canal_data[0].dimensi.panjang);
    setDimensiLebar(response.data[0].canal_data[0].dimensi.lebar);
    setDimensiTinggi(response.data[0].canal_data[0].dimensi.tinggi);
    setOrderNo(response.data[0].canal_data[0].order_no);
    setOperationNo(response.data[0].canal_data[0].operation_no);
    setStart(response.data[0].canal_data[0].start);
    setEnd(response.data[0].canal_data[0].end);
    setMeasurePoint(response.data[0].canal_data[0].measure_point);
    setWaterLevel(response.data[0].canal_data[0].water_level);
    setDepthCorrection(response.data[0].canal_data[0].depth_correction);
    setBedFloat(response.data[0].canal_data[0].bed_float);
    setRevision(response.data[0].canal_data[0].revision);
    setOperator(response.data[0].canal_data[0].operator);
    setQcDate(response.data[0].canal_data[0].qc_date);
    setMeasureDate(response.data[0].canal_data[0].measure_date);
    setUsvCode(response.data[0].canal_data[0].usv_code);
    setDistrictName(response.data[0].canal_data[0].district.name);
    setCanalUpperWidth(response.data[0].canal_data[0].canal_upper_width);
    setCanalBottomWidth(response.data[0].canal_data[0].canal_bottom_width);
    setCanalLength(response.data[0].canal_data[0].canal_length);
    setTranducer(response.data[0].canal_data[0].tranducer);
    setLane(response.data[0].canal_data[0].lane);
  };

  const updateData = async(e) => {
    e.preventDefault();
    try{
      await axios.patch(`http://localhost:5001/data/${id}`,{
        "canal_data.$.canal_id" : canalid,
        "canal_data.$.dimensi.panjang" : dimensiPanjang,
        "canal_data.$.dimensi.lebar" : dimensiLebar,
        "canal_data.$.dimensi.tinggi" : dimensiTinggi,
        "canal_data.$.order_no" : orderno,
        "canal_data.$.operation_no" : operationno,
        "canal_data.$.start" : start,
        "canal_data.$.end" : end,
        "canal_data.$.measure_point" : measurepoint,
        "canal_data.$.water_level" : waterlevel,
        "canal_data.$.depth_correction" : depthcorrection,
        "canal_data.$.bed_float" : bedfloat,
        "canal_data.$.revision" : revision,
        "canal_data.$.operator" : operator,
        "canal_data.$.qc_date" : qcdate,
        "canal_data.$.measure_date" : measuredate,
        "canal_data.$.usv_code" : usvcode,
        "canal_data.$.district.name" : districtname,
        "canal_data.$.district.code" : districtcode,
        "canal_data.$.canal_upper_width" : canalupperwidth,
        "canal_data.$.canal_bottom_width" : canalbottomwidth,
        "canal_data.$.canal_length" : canallength,
        "canal_data.$.tranducer" : tranducer,
        "canal_data.$.lane": lane
      });
      navigate(-1);
    }catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
    if(districtname === "District Sungai Beyuku"){
      setDistrictCode("3B01");
    }else if(districtname === "District Sungai Penyabungan"){
      setDistrictCode("3B03");
    }else if(districtname === "District Padang Sugihan"){
      setDistrictCode("3B02");
    }else if(districtname === "District Simpang Tiga"){
      setDistrictCode("3B04");
    }else if(districtname === "District Kuala Lumpur"){
      setDistrictCode("3A05");
    }else if(districtname === "District Sungai Jelutung"){
      setDistrictCode("3C01");
    }else if(districtname === "District Bagan Rame"){
      setDistrictCode("3C02");
    }else if(districtname === "District Air Sugihan"){
      setDistrictCode("3C03");
    }else if(districtname === "District Simpang Heran"){
      setDistrictCode("3C04");
    }else {
      setDistrictCode("3C05");
    }
  },[districtname])

  return (
    <div className="columns mt-5">
      <div className="column is-half">
        <form onSubmit={updateData}>
        <div className="field">
            <label className="label">Canal ID</label>
              <div className="control">
                <input 
                  type="text"
                  className="input" 
                  value={canalid}
                  onChange ={(e) => setCanalId(e.target.value)}
                  placeholder="Canal ID (ex: SJ400001)"/>
              </div>
          </div>
          <div className="field">
            <label className="label">Dimensi (m)</label>
            <div className="control" style={{display: 'flex', flexDirection: 'row'}}>
              <input 
                type="text" 
                className="input" 
                value={dimensiPanjang}
                onChange ={(e) => setDimensiPanjang(e.target.value)} />
              <p style={{margin: "auto 5px"}}>X</p>
              <input 
                type="text" 
                className="input" 
                value={dimensiLebar}
                onChange ={(e) => setDimensiLebar(e.target.value)} />
              <p style={{margin: "auto 5px"}}>X</p>
              <input 
                type="text" 
                className="input" 
                value={dimensiTinggi}
                onChange ={(e) => setDimensiTinggi(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="label">Order No</label>
            <div className="control">
              <input 
                type="text" 
                className="input" 
                value={orderno}
                onChange ={(e) => setOrderNo(e.target.value)} 
                placeholder="Order No (ex: 000000000001)"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Operation No</label>
            <div className="control">
              <input 
                type="text" 
                className="input" 
                value={operationno}
                onChange ={(e) => setOperationNo(e.target.value)} 
                placeholder="Operation No (ex: 0010)"/>
            </div>
          </div>
          <div className="field">
            <label className="label">start (m)</label>
            <div className="control">
              <input 
                type="text" 
                className="input" 
                value={start}
                onChange ={(e) => setStart(e.target.value)} 
                placeholder="Start (ex: 10)"/>
            </div>
          </div>
          <div className="field">
            <label className="label">End (m)</label>
            <div className="control">
              <input 
                type="text" 
                className="input" 
                value={end}
                onChange ={(e) => setEnd(e.target.value)} 
                placeholder="End (ex: 100)"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Measure Point</label>
            <div className="control">
              <input 
                type="text" 
                className="input" 
                value={measurepoint}
                onChange ={(e) => setMeasurePoint(e.target.value)} 
                placeholder="Measure Point (ex: 100000)"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Water Level (m)</label>
            <div className="control">
              <input 
                type="text" 
                className="input" 
                value={waterlevel}
                onChange ={(e) => setWaterLevel(e.target.value)} 
                placeholder="Nilai BP (ex: 0.66)"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Depth Correction (m)</label>
            <div className="control">
              <input 
                type="text" 
                className="input" 
                value={depthcorrection}
                onChange ={(e) => setDepthCorrection(e.target.value)} 
                placeholder="Sensor - Rambu (ex: 0.26)"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Bed Float (m)</label>
            <div className="control">
              <input 
                type="text" 
                className="input" 
                value={bedfloat}
                onChange ={(e) => setBedFloat(e.target.value)} 
                placeholder="Ketebalan Sedimen (ex: 0.26)"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Revision</label>
            <div className="control">
              <input 
                type="text" 
                className="input" 
                value={revision}
                onChange ={(e) => setRevision(e.target.value)} 
                placeholder="Revision (ex: 001)"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Operator</label>
              <div className="control">
                <input 
                  type="text"
                  className="input" 
                  value={operator}
                  onChange ={(e) => setOperator(e.target.value)}
                  placeholder="Operator (ex: Agus)"/>
              </div>
          </div>
          <div className="field">
            <label className="label">QC Date</label>
            <div className="control">
              <input 
                type="text" 
                className="input" 
                value={qcdate}
                onChange ={(e) => setQcDate(e.target.value)} 
                placeholder="QC Date (ex: 20211121)"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Measure Date</label>
            <div className="control">
              <input 
                type="text" 
                className="input" 
                value={measuredate}
                onChange ={(e) => setMeasureDate(e.target.value)} 
                placeholder="Measure Date (ex: 20211121)"/>
            </div>
          </div>
          <div className="field">
            <label className="label">USV Code</label>
            <div className="control">
              <input 
                type="text" 
                className="input" 
                value={usvcode}
                onChange ={(e) => setUsvCode(e.target.value)} 
                placeholder="USV Code (ex: Karta-Boat-01)"/>
            </div>
          </div>
          <div className="field">
            <label className="label">District Code</label>
            <div className="control" style={{display: 'flex', flexDirection: 'row'}}>
              <div className='select is-fullwidth' style={{margin: "0px 5px 0px 0px"}}>
                <select
                  value={districtname}
                  onChange={(e) => setDistrictName(e.target.value)}
                >
                  <option value="District Sungai Beyuku">District Sungai Beyuku (DSB)</option>
                  <option value="District Sungai Penyabungan">District Sungai Penyabungan (DSP)</option>
                  <option value="District Padang Sugihan">District Padang Sugihan (DPS)</option>
                  <option value="District Simpang Tiga">District Simpang Tiga (DST)</option>
                  <option value="District Kuala Lumpur">District Kuala Lumpur (DKL)</option>
                  <option value="District Sungai Jelutung">District Sungai Jelutung (DSJ)</option>
                  <option value="District Bagan Rame">District Bagan Rame (DBR)</option>
                  <option value="District Air Sugihan">District Air Sugihan (DAS)</option>
                  <option value="District Simpang Heran">District Simpang Heran (DSH)</option>
                  <option value="District Bagan Tengah">District Bagan Tengah (DBT)</option>
                </select>
              </div>
              <input 
                style={{margin: "0px 0px 0px 5px", width: "20%"}}
                type="text" 
                className="input" 
                value={districtcode}
                onChange ={(e) => setDistrictCode(e.target.value)} 
                disabled/>
            </div>
          </div>
          <div className="field">
            <label className="label">Canal Upper Width (m)</label>
            <div className="control">
              <input 
                type="text" 
                className="input" 
                value={canalupperwidth}
                onChange ={(e) => setCanalUpperWidth(e.target.value)} 
                placeholder="Canal Upper Width (ex: 10)"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Canal Bottom Width (m)</label>
            <div className="control">
              <input 
                type="text" 
                className="input" 
                value={canalbottomwidth}
                onChange ={(e) => setCanalBottomWidth(e.target.value)} 
                placeholder="Canal Bottom Width (ex: 10)"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Canal Length (m)</label>
            <div className="control">
              <input 
                type="text" 
                className="input" 
                value={canallength}
                onChange ={(e) => setCanalLength(e.target.value)} 
                placeholder="Canal Length (ex: 10)"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Tranducer (m)</label>
            <div className="control">
              <input 
                type="text" 
                className="input" 
                value={tranducer}
                onChange ={(e) => setTranducer(e.target.value)} 
                placeholder="Water Level - Sensor (ex: 2)"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Lane</label>
            <div className="control">
              <div className='select is-fullwidth'>
                <select
                  value={lane}
                  onChange={(e) => setLane(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type='submit' className='button is-success'>Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditData;