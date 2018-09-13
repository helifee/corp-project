package com.xinleju.platform.utils;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSONArray;
import com.xinleju.platform.base.utils.Page;
import com.xinleju.platform.tools.data.JacksonUtils;
import com.xinleju.platform.univ.search.dto.SearchCategoryPropertyDto;
import com.xinleju.platform.univ.search.dto.SearchIndexDto;
import com.xinleju.platform.univ.search.entity.SearchIndex;

/**
 * ES帮助类，进行索引操作的集中调用
 * 
 * @author haoqipeng
 *
 */
public class ElasticSearchHelper {
	
	private static Logger log = Logger.getLogger(ElasticSearchHelper.class);
	
	/** 索引名称 */
	public static final String ELASTIC_SEARCH_INDEX_INDEX = "esDocIndex";
	
	/** 索引类型 */
	public static final String ELASTIC_SEARCH_INDEX_TYPE = "esDocType";
	
	/** 索引排序属性key */
	public static final String ELASTIC_SEARCH_ORDERBY = "orderby";
	
	/** 索引排序类型key */
	public static final String ELASTIC_SEARCH_SORT = "sortOrder";
	
	/** 检索结果高亮开始标签 key */
	public static final String ELASTIC_SEARCH_HILIGHT_PRETAG = "hilightPreTag";
	
	/** 检索结果高亮结束标签 key */
	public static final String ELASTIC_SEARCH_HILIGHT_POSTTAG = "hilightPostTag";
	
	/** 全文检索高级查询条件参数 key */
	public static final String ELASTIC_SEARCH_SENIOR_PARAMETER = "seniorParameters";
	
	/**
	 * 初始化索引映射
	 * @param index
	 * @throws Exception 
	 */
	public static void initMapping(final SearchIndexDto index) throws Exception {
		// 初始化索引映射
		doOperation(new IndexOperationCall<Void>() {
			@Override
			public Void doWithES(ElasticSearchClient ec) throws IOException {
				ec.initMapping(index);
				return null;
			}
		});
	}
	
	/**
	 * 初始化索引
	 * 
	 * @param tendId
	 * @param searchCategoryPropertyDtoGroup
	 * @throws Exception
	 */
	public static String selectMapping(String[] indices) throws Exception {
		// 初始化索引映射
		return doOperation(new IndexOperationCall<String>() {
			@Override
			public String doWithES(ElasticSearchClient ec) throws IOException {
				String rs = ec.selectMapping(indices);
				return rs;
			}
		});
	}
	
	/**
	 * 初始化索引
	 * 
	 * @param tendId
	 * @param searchCategoryPropertyDtoGroup
	 * @throws Exception
	 */
	public static void initMapping(final String tendId, final Map<String, List<SearchCategoryPropertyDto>> searchCategoryPropertyDtoGroup) throws Exception {
		// 初始化索引映射
		doOperation(new IndexOperationCall<Void>() {
			@Override
			public Void doWithES(ElasticSearchClient ec) throws IOException {
				ec.createIndexIfNotExist(tendId);
				Collection<List<SearchCategoryPropertyDto>> dtoListCollection = searchCategoryPropertyDtoGroup.values();
				for (List<SearchCategoryPropertyDto> dtoList : dtoListCollection) {
					ec.initMapping(dtoList);
				}
				return null;
			}
		});
	}
	
	/**
	 * 参数化初始化索引映射
	 * 
	 * @param tendId
	 * @param searchCategoryPropertyDtoGroup
	 * @throws Exception
	 */
	public static void initMapping(final List<SearchCategoryPropertyDto> searchCategoryPropertyDtoList) throws Exception {
		// 初始化参数为空，不进行索引映射初始化操作
		if (null == searchCategoryPropertyDtoList || searchCategoryPropertyDtoList.size() == 0) {
			return;
		}
		// 初始化索引映射
		doOperation(new IndexOperationCall<Void>() {
			@Override
			public Void doWithES(ElasticSearchClient ec) throws IOException {
				// 先创建索引
				ec.createIndexIfNotExist(searchCategoryPropertyDtoList.get(0).getTendId());
				// 再添加映射
				ec.initMapping(searchCategoryPropertyDtoList);
				return null;
			}
		});
	}
	
	/**
	 * 更新索引映射
	 * @param index
	 * @throws Exception 
	 */
	public static void updateMapping(final List<SearchCategoryPropertyDto> searchCategoryPropertyDtoList) throws Exception {
		if (null == searchCategoryPropertyDtoList || searchCategoryPropertyDtoList.size() == 0) return;
		// 初始化索引映射
		doOperation(new IndexOperationCall<Void>() {
			@Override
			public Void doWithES(ElasticSearchClient ec) throws IOException {
				ec.createIndexIfNotExist(searchCategoryPropertyDtoList.get(0).getTendId());
				ec.updateMapping(searchCategoryPropertyDtoList);
				return null;
			}
		});
	}
	
	
	/**
	 * 更新索引映射
	 * @param index
	 * @throws Exception 
	 */
	public static void updateMapping(final SearchIndexDto index) throws Exception {
		// 初始化索引映射
		doOperation(new IndexOperationCall<Void>() {
			@Override
			public Void doWithES(ElasticSearchClient ec) throws IOException {
				ec.updateMapping(index);
				return null;
			}
		});
	}
	
	
	/**
	 * 添加索引
	 * @param index
	 * @throws Exception 
	 */
	public static void addIndex(final SearchIndex index) throws Exception {
		// 添加索引
		doOperation(new IndexOperationCall<Void>() {
			@Override
			public Void doWithES(ElasticSearchClient ec) throws IOException {
				ec.addIndex(index);
				return null;
			}
		});
	}
	
	/**
	 * 取得索引
	 * @param index
	 * @throws Exception 
	 */
	public static void getIndex(final SearchIndex index) throws Exception {
		// 取得索引
		doOperation(new IndexOperationCall<Void>() {
			@Override
			public Void doWithES(ElasticSearchClient ec) {
				ec.getIndex(index);
				return null;
			}
		});
	}
	
	/**
	 * 添加索引
	 * @param index
	 * @throws Exception 
	 */
	public static void addIndexBatch(final List<SearchIndex> indexList) throws Exception {
		// 添加索引
		doOperation(new IndexOperationCall<Void>() {
			@Override
			public Void doWithES(ElasticSearchClient ec) throws IOException {
				ec.addIndexBatch(indexList);
				return null;
			}
		});
	}
	
	/**
	 * 更新索引
	 * @param index
	 * @throws Exception 
	 */
	public static void updateIndex(final SearchIndex index) throws Exception {
		// 更新索引
		doOperation(new IndexOperationCall<Void>() {
			@Override
			public Void doWithES(ElasticSearchClient ec) throws IOException {
				ec.updateIndex(index);
				return null;
			}
		});
	}
	
	/**
	 * 更新索引
	 * @param index
	 * @throws Exception 
	 */
	public static void updateIndexBatch(final List<SearchIndex> indexList) throws Exception {
		// 更新索引
		doOperation(new IndexOperationCall<Void>() {
			@Override
			public Void doWithES(ElasticSearchClient ec) throws IOException {
				ec.updateIndexBatch(indexList);
				return null;
			}
		});
	}
	
	/**
	 * 更新索引
	 * @param index
	 * @throws Exception 
	 */
	public static void reIndex(final SearchIndexDto index, final SearchIndexDto newIndex) throws Exception {
		// 更新索引
		doOperation(new IndexOperationCall<Void>() {
			@Override
			public Void doWithES(ElasticSearchClient ec) {
				ec.reIndex(index, newIndex);
				return null;
			}
		});
	}
	
	/**
	 * 删除索引
	 * 
	 * @param index
	 * @throws Exception 
	 */
	public static void deleteIndex(final SearchIndex index) throws Exception {
		// 删除索引
		doOperation(new IndexOperationCall<Void>() {
			@Override
			public Void doWithES(ElasticSearchClient ec) {
				ec.deleteIndex(index);
				return null;
			}
		});
	}
	
	/**
	 * 清空索引
	 * 
	 * @param index
	 * @throws UnknownHostException
	 */
	public static void clearIndex(final SearchIndex index) throws Exception {
		// 删除索引
		doOperation(new IndexOperationCall<Void>() {
			@Override
			public Void doWithES(ElasticSearchClient ec) {
				ec.clearIndex(index);
				return null;
			}
		});
	}
	
	public static void deleteIndexBatch(final String esDocIndex, final String esDocType, final List<String> businessIds) throws Exception {
		// 批量删除索引
		doOperation(new IndexOperationCall<Void>() {
			@Override
			public Void doWithES(ElasticSearchClient ec) {
				ec.deleteIndexBatch(esDocIndex, esDocType, businessIds);
				return null;
			}
		});
	}
	
	
	/**
	 * 全文检索
	 * 
	 * @param page
	 * @param index
	 * @return
	 * @throws Exception 
	 */
	public static Page search(final Map<String, Object> parameters, final Map<String, String> categoryHostUrlMap) throws Exception {
		
		return doOperation(new IndexOperationCall<Page>() {
			@Override
			public Page doWithES(ElasticSearchClient ec) throws Exception {
				return ec.doFullTextQuery(parameters, categoryHostUrlMap);
			}
		});
		
		
	}
	
	/**
	 * 根据索引属性列表将索引内容转换成索引JSON字符串
	 * @param source 索引内容
	 * @param fieldList 属性列表
	 * @return 索引JSON
	 * @throws IOException
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static Map<String, Object> content2IndexJsonString(String source, List<String> fieldList, String files) throws IOException {
		
		/*Map sourceMap = JacksonUtils.fromJson(source, HashMap.class);
		sourceMap.put("files", JSONArray.parseArray(files, String.class));
		XContentBuilder jsonBuild = XContentFactory.jsonBuilder();
		
		jsonBuild.startObject();
		
		for (String field : fieldList) {
			jsonBuild.field(field, sourceMap.get(field));
		}
//		if (fieldList.indexOf("files") != -1) {
//			jsonBuild.field("files", files);
//		}
		jsonBuild.endObject();

		return jsonBuild.string();*/
		
		Map sourceMap = JacksonUtils.fromJson(source, HashMap.class);
		sourceMap.put("files", JSONArray.parseArray(files, HashMap.class));
		
		Map<String, Object> resultMap = new HashMap<>();
		
		
		for (String field : fieldList) {
			resultMap.put(field, sourceMap.get(field));
		}

		return resultMap;
	}
	
	public static <T> T doOperation(IndexOperationCall<T> call) throws Exception {
		ElasticSearchClient ec = null;
		try {
			ec = ElasticSearchClient.newInstance();
			return call.doWithES(ec);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw e;
		} finally {
			if (null != ec){
				ec.destroy();
			}
		}
	}
	
	public static void main(String[] args) {
		// testTemp();
		
		String tendIdXinju = "aa19ccff1a0645aa8ec8e52e6c27f408";
		String tendIdXiaoyao = "5f66ea212d874acc93aaa24700a51de3";
		
		// 初始化索引映射
		 //testUpdateMapping();
//		clearIndex(tendIdXinju);
		//testReIndex();
		try {
			selectMapping(new String[]{tendIdXiaoyao});
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}


	static void testTemp() {
		try {
			List<SearchIndex> addList = new ArrayList<>();
			Map<String, Object> map = new HashMap<>();
			List<String> ids = new ArrayList<String>();
			for (int i = 20; i < 30; i++) {
				SearchIndex index = new SearchIndex();
				index.setEsDocIndex("001");
				index.setEsDocType("news");
				index.setEsDocId("news0000" + (i + 1));
				//getIndex(index);
				ids.add(index.getEsDocId());
				map.put("content", "这是一条全文检索测试用新闻这是一条全文检索测试用新闻这是一条全文检索测试用新闻这是一条全文检索测试用新闻这是一条全文检索测试用新闻"+((i%2==0)?"鑫乐居":""));
				map.put("id", index.getEsDocId());
				map.put("title", "测试新闻标题");
				map.put("createPersonName", "郝齐鹏");
				map.put("url", "http://www.baidu.com");
				map.put("createDate", new Date().getTime());
				
				index.setContent(JacksonUtils.toJson(map));
				//addIndex(index);
				//addList.add(index);
			}
		
			//deleteIndexBatch("a001", "news", ids);
			//updateIndexBatch(addList);
			//SearchIndex index2 = new SearchIndex();
			//index2.setEsDocIndex("001");
			//clearIndex(index2);
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		Page page = new Page();
		page.setStart(0);
		page.setLimit(10);
//		SearchIndexDto index1 = new SearchIndexDto();
		SearchIndexDto index1 = new SearchIndexDto();
//		index1.setEsDocIndex("a001");
		index1.setEsDocIndex("aa19ccff1a0645aa8ec8e52e6c27f408");
		index1.setEsDocType("news");
//		index1.setEsDocId("news00001");
		index1.setContent("这");
		
		Map<String, Object> map1 = new HashMap<>();
		map1.put("start", "0");
		map1.put("limit", "10");
		//map1.put("esDocIndex", "001");
		map1.put("esDocIndex", "27cffb9f205b49b7aa48c6011c5fe1e4");
		map1.put("esDocType", "news");
//		map1.put("esDocId", "news00001");
		map1.put("keyword", "新闻");
		map1.put("seniorParameters", "{\"title\":\"新闻\"}");
		map1.put("hilightPreTag", "<span class=\"hit\" style=\"margin:0;padding:0;\">");
		map1.put("hilightPostTag", "</span>");
		
		map1.put("orderby", "createDate");
		map1.put("sortOrder", "desc");
		
		
		try {
			//initMapping(index1);
			SearchIndex index = new SearchIndex();
			index.setEsDocIndex("aa19ccff1a0645aa8ec8e52e6c27f408");
			index.setEsDocType("flow");
			index.setEsDocId("fe561e92dcd14b20aa1b95b17bef3ffd");
			//deleteIndex(index);
			
			Page p = search(map1, new HashMap<String, String>());
			System.out.println("----------------------------------------");
			//System.out.println(JacksonUtils.toJson(p.getList()));
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
	}
	
	static void testUpdateMapping() {
		SearchIndexDto index1 = new SearchIndexDto();
//		index1.setEsDocIndex("a001");
		index1.setEsDocIndex("aa19ccff1a0645aa8ec8e52e6c27f408");
		index1.setEsDocType("news");
		try {
			updateMapping(index1);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	static void testReIndex() {
		SearchIndexDto newIndex = new SearchIndexDto();
		newIndex.setEsDocIndex("5f66ea212d874acc93aaa24700a51de3");
		newIndex.setEsDocType("news");
		
		SearchIndexDto index = new SearchIndexDto();
		index.setEsDocIndex("5f66ea212d874acc93aaa24700a51de3_");
		index.setEsDocType("news");
		try {
			initMapping(newIndex);
			reIndex(index, newIndex);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	static void clearIndex(String tendId) {
		SearchIndex index = new SearchIndex();
		index.setEsDocIndex(tendId);
		try {
			clearIndex(index);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	static void testReplaceAll() {
		Pattern p = Pattern.compile("\\s");
		Matcher m = p.matcher("	asdfasdf\r\n dfasfas    \tsdfs\fsdfas");
		String ss = m.replaceAll("");
		System.out.println(ss);
	}
	
}
