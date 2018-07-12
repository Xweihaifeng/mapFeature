let igisObj = null;
let serviceObj = null;

function initMap(divId) {
	igisObj = new iGis.GisMap();
	let options = {
		mapType: iGis.MapType.OPENSTREET_MAP,
		divId: divId,
		center: [108.9283, 34],
		zoom: 8,
		projection: 'EPSG:3857',
		zoomType: 'big',
		isScaleLine: true,
		isMousePosition: true,
		isDMSLonLat: false,
		isZoomLevel: true,
		units: 'metric',
		wrapX: false
	};
	igisObj.createMap(options);
}

function addWms() {
	serviceObj = new iGis.layers.ServiceLayer(igisObj);
	serviceObj.addWmsLayer({
		serviceId: 'WMS',
		url: 'http://114.115.183.47:8000/mapserver/shp',
		params: {
			LAYERS: 'MapServer',
			ZOOM: 5,
			EDGEBUFFER: 20
		}
	});
	igisObj.setMapCenter([108.83599, 34.21070]);
	igisObj.setMapZoom(15);
}

function removeWms() {
	serviceObj.removeWmsLayer('WMS');
}

function serverMap(options) {
	let mymap = new iGis.GisMap();
	let center = options.centerPoint.split(',');
	if(options.serviceType == 'WFS') {
		let param = {
			mapType: iGis.MapType.XYZ_MAP,
			url: 'http://t5.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}',
			url2: 'http://t2.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}',
			divId: options.divId,
			douLayer: true,
			center: [parseFloat(center[0]), parseFloat(center[1])],
			zoom: 18,
			layerName: 'gisserver',
			projection: 'EPSG:3857',
			zoomType: 'big',
			isScaleLine: true,
			isMousePosition: true,
			isDMSLonLat: false,
			isZoomLevel: true,
			minZoom: 15,
			maxZoom: 22,
			units: 'metric',
			wrapX: false
		};
		mymap.createMap(param);
		let feaTypeName = options.remark.split(',');
		for(let item of feaTypeName) {
			let proArr = item.split('|');
			new iGis.layers.DataServerLayer({
				gisMapObj: mymap,
				isHover: true,
				serverType: 'WFSSERVER',
				url: `http://${options.serviceIp}:${options.servicePort}${options.serviceUrl}`,
				featureNS: "http://mapserver.gis.umn.edu/mapserver",
				featureType: [proArr[0]],
				isRef: true,
				layerOptions: {
					strokeColor: '#686868',
					strokeWidth: 1.5,
					fillColor: '#FFFFFF',
					minShowZoom: proArr[1]
				}
			});
		}
//		let layer_floor = new iGis.layers.DataServerLayer({
//			gisMapObj: mymap,
//			isHover: false,
//			serverType: 'WFSSERVER',
//			url: `http://${options.serviceIp}:${options.servicePort}${options.serviceUrl}`,
//			featureNS: "http://mapserver.gis.umn.edu/mapserver",
//			featureType: ['layer_floor|15,'],
//			isRef: true,
//			layerOptions: {
//				strokeColor: '#686868',
//				strokeWidth: 1.5,
//				fillColor: '#FFFFFF',
//				minShowZoom: 15
//			}
//		});
//		let layer_region = new iGis.layers.DataServerLayer({
//			gisMapObj: mymap,
//			isHover: true,
//			serverType: 'WFSSERVER',
//			url: `http://${options.serviceIp}:${options.servicePort}${options.serviceUrl}`,
//			featureNS: "http://mapserver.gis.umn.edu/mapserver",
//			featureType: ['layer_region'],
//			isRef: true,
//			layerOptions: {
//				strokeColor: '#686868',
//				strokeWidth: 1.5,
//				fillColor: '#FFFFFF',
//				minShowZoom: 17
//			}
//		});
//		let layer_region_sub = new iGis.layers.DataServerLayer({
//			gisMapObj: mymap,
//			isHover: false,
//			serverType: 'WFSSERVER',
//			url: `http://${options.serviceIp}:${options.servicePort}${options.serviceUrl}`,
//			featureNS: "http://mapserver.gis.umn.edu/mapserver",
//			featureType: ['layer_region_sub'],
//			isRef: true,
//			layerOptions: {
//				strokeColor: '#686868',
//				strokeWidth: 1.5,
//				fillColor: '#FFFFFF',
//				minShowZoom: 19
//			}
//		});
	} else {
		let param = {
			mapType: `${options.serviceType}_MAP`,
			divId: options.divId,
			url: `http://${options.serviceIp}:${options.servicePort}${options.serviceUrl}`,
			center: [parseFloat(center[0]), parseFloat(center[1])],
			layerName: options.serviceName,
			layerParams: {
				LAYERS: options.serviceName
			},
			zoom: 10,
			projection: `EPSG:${options.srid}`,
			matrixSet:`EPSG:${options.srid}`,
			zoomType: 'big',
			isScaleLine: true,
			isMousePosition: true,
			isDMSLonLat: false,
			isZoomLevel: true,
			maxZoom: 22,
			units: 'metric',
			wrapX: false
		};
		mymap.createMap(param);
	}
	if(options.serviceType == 'GeoJSON') {
		let geoObj = new iGis.layers.DataServerLayer({
			gisMapObj: mymap,
			serverType: 'GEOSERVER',
			isHover: true,
			url: 'static/json/china.geojson',
			dataProjection: 'EPSG:4326',
			layerOptions: {
				strokeWidth: 2,
				fillColor: '#FFFAE8'
			}
		});
		mymap.setMapZoom(5);
	} else if(options.serviceName == 'gisserver_wms_tiff_forest') {
		mymap.setMapCenter([5.438255094736563, 5.363262811023972]);
		mymap.setMapZoom(15);
		let vector = new ol.layer.Vector({
			source: new ol.source.Vector({
				url: 'static/json/out1.geojson',
				format: new ol.format.GeoJSON({
					defaultDataProjection: 'EPSG:3857',
					featureProjection: 'EPSG:4326'
				})
			})
		});
		mymap.getCurrMap().addLayer(vector);
	} else if(options.serviceName == 'gisserver_wms_shape_bantian_indoor') {
		mymap.setMapZoom(18);
	}
}

export {
	initMap,
	serverMap,
	addWms,
	removeWms
}